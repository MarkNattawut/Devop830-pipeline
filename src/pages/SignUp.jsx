import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setMessage('กรุณากรอกข้อมูลให้ครบทั้งหมด');
      setIsSuccess(false);
      return;
    }

    if (formData.password.length < 6) {
      setMessage('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
      setIsSuccess(false);
      return;
    }

    const result = signup(
      formData.name,
      formData.email,
      formData.password,
      formData.confirmPassword
    );
    
    setMessage(result.message);
    setIsSuccess(result.success);

    if (result.success) {
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-image">
          <div className="image-placeholder">
            <h2>SIZE N TAG</h2>
            <p>เข้าร่วมครอบครัว!</p>
            <p className="tagline">สมัครสมาชิกแล้วเริ่มเลือกสินค้าที่ชอบ</p>
          </div>
        </div>

        <div className="auth-box">
          <h1>สมัครสมาชิก</h1>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">ชื่อของคุณ</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="เช่น สมชาย ใจดี"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">อีเมล</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">รหัสผ่าน</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="อย่างน้อย 6 ตัวอักษร"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="กรุณากรอกรหัสผ่านอีกครั้ง"
                required
              />
            </div>

            {message && (
              <div className={`message ${isSuccess ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            <button type="submit" className="btn-auth">
              สมัครสมาชิก
            </button>
          </form>

          <div className="auth-divider">หรือ</div>

          <p className="auth-footer">
            มีบัญชีแล้ว? <Link to="/login" className="auth-link">ล็อกอินที่นี่</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
