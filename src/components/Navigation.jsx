import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navigation.css";

function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-logo">SIZE N TAG</Link>
      </div>
      
      {/* เมนูที่แสดงเฉพาะเมื่อล็อกอินแล้ว */}
      {user && (
        <ul className="navbar-menu">
          <li><Link to="/products">สินค้า</Link></li>
          <li><Link to="/about">เกี่ยวกับเรา</Link></li>
          <li><Link to="/contact">ติดต่อเรา</Link></li>
          <li><Link to="/cart">ตะกร้า</Link></li>
          {user.role === 'admin' && <li><Link to="/admin">Admin Panel</Link></li>}
        </ul>
      )}

      <div className="navbar-auth">
        {user ? (
          <div className="user-section">
            <span className="user-name">👤 {user.name}</span>
            <button onClick={logout} className="btn-logout">ออกจากระบบ</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn-login">เข้าสู่ระบบ</Link>
            <Link to="/signup" className="btn-signup">สมัครสมาชิก</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
