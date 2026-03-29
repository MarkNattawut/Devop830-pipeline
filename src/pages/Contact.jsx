import { useState } from "react";
import "../styles/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`ขอบคุณ ${formData.name} ค่ะ เราจะติดต่อกลับไปยัง ${formData.email} ในเร็วๆ นี้ ✓`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <h1>📧 ติดต่อเรา</h1>
      
      <div className="contact-container">
        <div className="contact-info">
          <h2>ติดต่อสอบถาม SIZE N TAG</h2>
          
          <div className="info-item">
            <h3>📍 ที่อยู่</h3>
            <p>Chiang Mai, Thailand</p>
          </div>

          <div className="info-item">
            <h3>📞 โทรศัพท์</h3>
            <p>+66 8X-XXX-XXXX</p>
          </div>

          <div className="info-item">
            <h3>✉️ อีเมล</h3>
            <p>info@sizentag.com</p>
          </div>

          <div className="info-item">
            <h3>🕐 เวลาทำการ</h3>
            <p>จันทร์ - ศุกร์: 09:00 - 18:00 น.</p>
            <p>เสาร์ - อาทิตย์: ปิด</p>
          </div>

          <div className="social-links">
            <h3>📱 Social Media</h3>
            <div className="links">
              <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="#" target="_blank" rel="noopener noreferrer">TikTok</a>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>📝 ส่งข้อความหา SIZE N TAG</h2>
          
          <div className="form-group">
            <label htmlFor="name">ชื่อของคุณ</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="เช่น สมชาย ใจดี"
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
              required
              placeholder="example@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">ข้อความ</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              placeholder="บอกเราถึงสิ่งที่คุณต้องการ..."
            ></textarea>
          </div>

          <button type="submit" className="btn-submit">
            ส่งข้อความ 📨
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
