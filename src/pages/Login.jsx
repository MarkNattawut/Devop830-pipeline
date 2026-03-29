import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setMessage('กรุณากรอกอีเมลและรหัสผ่าน');
      setIsSuccess(false);
      return;
    }

    const result = login(email, password);
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
        <div className="auth-box">
          <h1>เข้าสู่ระบบ</h1>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">อีเมล</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="กรุณากรอกอีเมล"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">รหัสผ่าน</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="กรุณากรอกรหัสผ่าน"
                required
              />
            </div>

            {message && (
              <div className={`message ${isSuccess ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            <button type="submit" className="btn-auth">
              ล็อกอิน
            </button>
          </form>

          <div className="auth-divider">หรือ</div>

          <p className="auth-footer">
            ยังไม่มีบัญชี? <Link to="/signup" className="auth-link">สมัครสมาชิก</Link>
          </p>

          <div className="demo-info">
            <p className="demo-title">ข้อมูลทดสอบ:</p>
            <p>Email: test@example.com</p>
            <p>Password: password123</p>
          </div>
        </div>

        <div className="auth-image">
          <div className="image-placeholder">
            <h2>SIZE N TAG</h2>
            <p>ยินดีต้อนรับกลับ!</p>
            <p className="tagline">เลือกแบบสตรีท เลือกไซส์ เลือกสีที่ชอบ</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
