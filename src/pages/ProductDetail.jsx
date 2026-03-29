import { useParams } from "react-router-dom";
import "../styles/ProductDetail.css";
import { useState } from "react";
import { useStore } from "../context/StoreContext";

function ProductDetail() {
  const { products, addToCart } = useStore();
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState(product?.size[0]);
  const [selectedColor, setSelectedColor] = useState(product?.color[0]);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="error">ไม่พบสินค้านี้ 😢</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    alert(`เพิ่ม ${product.name} x${quantity} (ไซส์: ${selectedSize}, สี: ${selectedColor}) ลงตะกร้า ✓`);
  };

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product-image-large">
          <img src={product.image} alt={product.name} />
        </div>
        
        <div className="product-details">
          <h1>{product.name}</h1>
          <p className="brand-name">{product.brand}</p>
          <p className="price-large">฿{product.price}</p>
          
          <div className="description">
            <h3>📝 รายละเอียด</h3>
            <p>{product.description}</p>
          </div>

          <div className="options">
            <div className="option-group">
              <label>ไซส์:</label>
              <div className="size-options">
                {product.size.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <label>สี:</label>
              <div className="color-options">
                {product.color.map(color => (
                  <button
                    key={color}
                    className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <label>จำนวน:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="quantity-input"
              />
            </div>
          </div>

          <button className="btn-add-to-cart" onClick={handleAddToCart}>
            🛒 เพิ่มลงตะกร้า
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
