import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Home.css";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>SIZE N TAG</h1>
          <p>แบรนด์เสื้อผ้าเพื่อชีวิตอย่างสุขสันต์</p>
          <p className="tagline">ทุกแบบสตรีท ทุกไซส์ ทุกคน</p>
          
          {user ? (
            <button className="btn-start-shopping" onClick={() => navigate('/products')}>
              ไปเลือกสินค้า
            </button>
          ) : (
            <div className="auth-prompt">
              <p className="prompt-text">กรุณาเข้าสู่ระบบเพื่อเลือกซื้อสินค้า</p>
              <div className="btn-group">
                <button className="btn-login" onClick={() => navigate('/login')}>
                  เข้าสู่ระบบ
                </button>
                <button className="btn-signup" onClick={() => navigate('/signup')}>
                  สมัครสมาชิก
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="features">
        <div className="feature-card">
          <h3>คุณภาพ</h3>
          <p>ผ้าดีคุณภาพดี สวมใส่นาน</p>
        </div>
        <div className="feature-card">
          <h3>ราคาดีเยี่ยม</h3>
          <p>ราคาเป็นธรรม ของดี ราคาไม่แพง</p>
        </div>
        <div className="feature-card">
          <h3>หลายไซส์</h3>
          <p>ทุกไซส์ เทพีพอดี</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
