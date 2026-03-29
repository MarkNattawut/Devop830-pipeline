import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import '../styles/Admin.css';

function Admin() {
  const { products, orders, addProduct, updateProduct, deleteProduct } = useStore();
  const [activeTab, setActiveTab] = useState('products');
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ name: '', brand: '', price: '', image: '', size: '', color: '', description: '' });

  const resetForm = () => setForm({ name: '', brand: '', price: '', image: '', size: '', color: '', description: '' });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.brand || !form.price) {
      alert('กรุณากรอกชื่อแบรนด์และราคาสินค้า');
      return;
    }

    const prepared = {
      ...form,
      price: Number(form.price),
      size: form.size.split(',').map(x => x.trim()).filter(Boolean),
      color: form.color.split(',').map(x => x.trim()).filter(Boolean)
    };

    if (editProduct) {
      updateProduct({ ...prepared, id: editProduct.id });
      setEditProduct(null);
      alert('แก้ไขสินค้าสำเร็จ');
    } else {
      addProduct(prepared);
      alert('เพิ่มสินค้าสำเร็จ');
    }
    resetForm();
  };

  const onEdit = (product) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      size: product.size.join(', '),
      color: product.color.join(', '),
      description: product.description
    });
    setActiveTab('products');
  };

  const onDelete = (id) => {
    if (window.confirm('ต้องการลบสินค้านี้จริงหรือไม่?')) {
      deleteProduct(id);
    }
  };

  return (
    <div className="admin-page">
      <h1>🛠 Admin Dashboard</h1>
      <div className="admin-tabs">
        <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>จัดการสินค้า</button>
        <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>ประวัติการสั่งซื้อ</button>
      </div>

      {activeTab === 'products' && (
        <div className="admin-section">
          <div className="product-form-card">
            <h2>{editProduct ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}</h2>
            <form onSubmit={onSubmit} className="admin-product-form">
              <label>ชื่อสินค้า</label>
              <input name="name" value={form.name} onChange={onChange} />
              <label>แบรนด์</label>
              <input name="brand" value={form.brand} onChange={onChange} />
              <label>ราคา</label>
              <input name="price" type="number" value={form.price} onChange={onChange} />
              <label>ลิงก์รูปภาพ</label>
              <input name="image" value={form.image} onChange={onChange} placeholder="https://..." />
              <label>ไซส์ (คั่นด้วย ,)</label>
              <input name="size" value={form.size} onChange={onChange} />
              <label>สี (คั่นด้วย ,)</label>
              <input name="color" value={form.color} onChange={onChange} />
              <label>คำอธิบาย</label>
              <textarea name="description" value={form.description} onChange={onChange}></textarea>
              <button type="submit" className="btn-save">{editProduct ? 'บันทึกการแก้ไข' : 'เพิ่มสินค้า'}</button>
              {editProduct && <button type="button" className="btn-cancel" onClick={() => { setEditProduct(null); resetForm(); }}>ยกเลิก</button>}
            </form>
          </div>

          <div className="admin-products-table">
            <h2>รายการสินค้าในระบบ</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ชื่อ</th>
                  <th>แบรนด์</th>
                  <th>ราคา</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.brand}</td>
                    <td>฿{p.price}</td>
                    <td>
                      <button className="btn-action" onClick={() => onEdit(p)}>แก้ไข</button>
                      <button className="btn-action danger" onClick={() => onDelete(p.id)}>ลบ</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="admin-section">
          <h2>รายการสั่งซื้อทั้งหมด</h2>
          {orders.length > 0 ? (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div><strong>รหัสออร์เดอร์:</strong> {order.id}</div>
                    <div><strong>วันที่:</strong> {new Date(order.createdAt).toLocaleString()}</div>
                    <div><strong>สถานะ:</strong> {order.status}</div>
                    <div><strong>ผู้ซื้อ:</strong> {order.user?.name || 'Guest'}</div>
                    <div><strong>รวม:</strong> ฿{order.total}</div>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>สินค้า</th>
                        <th>ราคา</th>
                        <th>จำนวน</th>
                        <th>รวม</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.name} ({item.size}/{item.color})</td>
                          <td>฿{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>฿{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ) : (
            <p>ยังไม่มีรายการสั่งซื้อในระบบ</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;
