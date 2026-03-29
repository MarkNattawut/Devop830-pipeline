import { createContext, useState, useContext, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await fetch(`${API_URL}/api/products`);
        const ordersRes = await fetch(`${API_URL}/api/orders`);

        if (productsRes.ok) {
          const productData = await productsRes.json();
          setProducts(productData);
          localStorage.setItem('products', JSON.stringify(productData));
        } else {
          throw new Error('Products fetch failed');
        }

        if (ordersRes.ok) {
          const orderData = await ordersRes.json();
          setOrders(orderData);
          localStorage.setItem('orders', JSON.stringify(orderData));
        } else {
          throw new Error('Orders fetch failed');
        }
      } catch (error) {
        const savedProducts = localStorage.getItem('products');
        const savedCart = localStorage.getItem('cart');
        const savedOrders = localStorage.getItem('orders');

        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        } else {
          setProducts(initialProducts);
          localStorage.setItem('products', JSON.stringify(initialProducts));
        }

        if (savedOrders) {
          setOrders(JSON.parse(savedOrders));
        }

        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      }
    };

    fetchData();
  }, [API_URL]);

  useEffect(() => {
    if(products.length > 0){
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if(orders.length > 0){
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders]);

  const addProduct = async (data) => {
    const newProduct = {
      ...data,
      price: Number(data.price)
    };

    try {
      const response = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (response.ok) {
        const saved = await response.json();
        setProducts(prev => [...prev, saved]);
        return saved;
      }
    } catch (error) {
      // fallback local
    }

    const fallback = { ...newProduct, id: Date.now() };
    setProducts(prev => [...prev, fallback]);
    return fallback;
  };

  const updateProduct = async (updated) => {
    const dataToSave = { ...updated, price: Number(updated.price) };
    try {
      const response = await fetch(`${API_URL}/api/products/${updated.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave)
      });
      if (response.ok) {
        const saved = await response.json();
        setProducts(prev => prev.map(prod => prod.id === saved.id ? saved : prod));
        return;
      }
    } catch (error) {
      // fallback
    }
    setProducts(prev => prev.map(prod => prod.id === updated.id ? dataToSave : prod));
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/api/products/${productId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('delete failed');
      }
    } catch (error) {
      // fallback continue
    }
    setProducts(prev => prev.filter(prod => prod.id !== productId));
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const addToCart = (product, size, color, quantity) => {
    const existing = cart.find(item => item.id === product.id && item.size === size && item.color === color);
    if (existing) {
      setCart(prev => prev.map(item =>
        item.id === product.id && item.size === size && item.color === color
          ? { ...item, quantity: item.quantity + Number(quantity) }
          : item
      ));
    } else {
      setCart(prev => [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        size,
        color,
        quantity: Number(quantity)
      }]);
    }
  };

  const removeCartItem = (key) => {
    setCart(prev => prev.filter(item => item.id !== key));
  };

  const updateCartItem = (key, quantity) => {
    setCart(prev => prev.map(item =>
      item.id === key ? { ...item, quantity: Number(quantity) } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = async (user) => {
    if (cart.length === 0) return null;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = {
      user: user ? { id: user.id, name: user.name, email: user.email } : null,
      items: cart,
      total,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      if (response.ok) {
        const saved = await response.json();
        setOrders(prev => [...prev, saved]);
        clearCart();
        return saved;
      }
    } catch (error) {
      // fallback local
    }

    const fallbackOrder = { ...order, id: Date.now() };
    setOrders(prev => [...prev, fallbackOrder]);
    clearCart();
    return fallbackOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        addToCart,
        removeCartItem,
        updateCartItem,
        clearCart,
        placeOrder
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
}
