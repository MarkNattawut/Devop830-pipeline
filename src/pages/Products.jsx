import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import "../styles/Products.css";

function Products() {
  const { products } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  const brands = ["all", ...new Set(products.map(product => product.brand))];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm);
      const matchesBrand = selectedBrand === "all" || product.brand === selectedBrand;
      return matchesSearch && matchesBrand;
    })
    .sort((a, b) => {
      if (sortOption === "priceAsc") return a.price - b.price;
      if (sortOption === "priceDesc") return b.price - a.price;
      return a.id - b.id;
    });

  return (
    <div className="products-page">
      <h1>👕 สินค้าของเรา</h1>
      
      <div className="search-container" style={{ display: "grid", gap: "0.7rem" }}>
        <input
          type="text"
          placeholder="🔍 ค้นหาสินค้า..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
          <select value={selectedBrand} onChange={handleBrandChange} className="search-input" style={{ maxWidth: 220 }}>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand === "all" ? "ทุกแบรนด์" : brand}
              </option>
            ))}
          </select>
          <select value={sortOption} onChange={handleSortChange} className="search-input" style={{ maxWidth: 220 }}>
            <option value="default">จัดเรียงตามค่าเริ่มต้น</option>
            <option value="priceAsc">ราคาต่ำ &rarr; สูง</option>
            <option value="priceDesc">ราคาสูง &rarr; ต่ำ</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="brand">{product.brand}</p>
                <p className="description">{product.description.substring(0, 50)}...</p>
                <p className="price">฿{product.price}</p>
                <span className="btn-view">ดูรายละเอียด →</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-results">ไม่พบสินค้าที่ค้นหา 😢</div>
        )}
      </div>
    </div>
  );
}

export default Products;
