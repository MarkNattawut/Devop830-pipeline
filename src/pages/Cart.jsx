import "../styles/Cart.css";
import { useStore } from "../context/StoreContext";
import { useAuth } from "../context/AuthContext";

function Cart() {
  const { cart, removeCartItem, updateCartItem, placeOrder, clearCart } = useStore();
  const { user } = useAuth();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleRemoveItem = (id) => {
    removeCartItem(id);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('ตะกร้าว่างอยู่');
      return;
    }

    const order = placeOrder(user);
    if (order) {
      alert(`ชำระเงินสำเร็จรวม ฿${order.total} (รหัส ${order.id})`);
    }
  };

  return (
    <div className="cart-page">
      <h1>🛒 ตะกร้าสินค้า</h1>

      {cart.length > 0 ? (
        <div className="cart-container">
          <div className="cart-items">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>สินค้า</th>
                  <th>ราคา</th>
                  <th>จำนวน</th>
                  <th>รวม</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={`${item.id}-${item.size}-${item.color}`}>
                    <td>
                      <div className="item-info">
                        <p><strong>{item.name}</strong></p>
                        <p className="item-specs">ไซส์: {item.size} | สี: {item.color}</p>
                      </div>
                    </td>
                    <td>฿{item.price}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        className="qty-input"
                        onChange={(e) => updateCartItem(item.id, e.target.value)}
                      />
                    </td>
                    <td className="total">฿{item.price * item.quantity}</td>
                    <td>
                      <button
                        className="btn-remove"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-summary">
            <h2>📊 สรุปการซื้อ</h2>
            <div className="summary-row">
              <span>รวมสินค้า:</span>
              <span>฿{calculateTotal()}</span>
            </div>
            <div className="summary-row">
              <span>ค่าจัดส่ง:</span>
              <span>฿50</span>
            </div>
            <div className="summary-row">
              <span>ค่าภาษี:</span>
              <span>฿0</span>
            </div>
            <div className="summary-row total-row">
              <span><strong>รวมทั้งหมด:</strong></span>
              <span><strong>฿{calculateTotal() + 50}</strong></span>
            </div>
            
            <button className="btn-checkout" onClick={handleCheckout}>
              💳 ดำเนินการชำระเงิน
            </button>
            <button className="btn-continue-shopping">
              ← ซื้อสินค้าต่อ
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <p>🛒 ตะกร้าของคุณว่างเปล่า</p>
          <p>ไปเลือกสินค้าสักชิ้นมาสิ! 👕</p>
        </div>
      )}
    </div>
  );
}

export default Cart;
