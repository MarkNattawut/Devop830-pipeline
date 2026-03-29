import "../styles/About.css";

function About() {
  return (
    <div className="about-page">
      <h1>ℹ️ เกี่ยวกับ SIZE N TAG</h1>
      
      <div className="about-content">
        <section className="about-section">
          <h2>📖 เรื่องราวของเรา</h2>
          <p>
            SIZE N TAG เกิดจากความฝันของผู้สร้างที่อยากให้ทุกคนสามารถแต่งตัวแบบที่ต้องการ
            ไม่ว่าจะสูง สั้น ผอม หรือตัวโตๆ ทุกๆ คนสมควรได้ใส่เสื้อผ้าที่เข้ารูปและสวยงาม
          </p>
        </section>

        <section className="about-section">
          <h2>⭐ ค่านิยมของเรา</h2>
          <ul className="values-list">
            <li>✓ <strong>คุณภาพ:</strong> เราใช้วัสดุที่ดีที่สุด</li>
            <li>✓ <strong>ความพอใจของลูกค้า:</strong> ลูกค้าคือศูนย์กลางของทุกสิ่ง</li>
            <li>✓ <strong>ความสร้างสรรค์:</strong> ออกแบบเสื้อผ้าที่ทันสมัย</li>
            <li>✓ <strong>ความยั่งยืน:</strong> ห่วงใจสิ่งแวดล้อม</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>🎯 พันธกิจ</h2>
          <p>
            ให้ทุกคนสามารถค้นหาสไตล์ของตนเอง ด้วยราคาที่เหมาะสม และคุณภาพที่ดี
            SIZE N TAG อยู่เพื่อให้บริการคุณดีที่สุด
          </p>
        </section>

        <section className="about-section stats">
          <h2>📊 สถิติของเรา</h2>
          <div className="stats-grid">
            <div className="stat">
              <h3>2000+</h3>
              <p>ลูกค้าที่พอใจ</p>
            </div>
            <div className="stat">
              <h3>100+</h3>
              <p>ดีไซน์ต่างๆ</p>
            </div>
            <div className="stat">
              <h3>XS - XXL</h3>
              <p>ไซส์ให้เลือก</p>
            </div>
            <div className="stat">
              <h3>100%</h3>
              <p>ลูกค้าจะกลับมา</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
