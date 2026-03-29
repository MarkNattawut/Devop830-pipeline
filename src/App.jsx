import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import './App.css';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StoreProvider>
          <div className="App">
          <Navigation />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected Routes - ต้องล็อกอินก่อน */}
              <Route path="/products" element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              } />
              <Route path="/product/:id" element={
                <ProtectedRoute>
                  <ProductDetail />
                </ProtectedRoute>
              } />
              <Route path="/cart" element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute adminOnly>
                  <Admin />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <footer className="app-footer">
            <p>&copy; 2024 SIZE N TAG - ทุกสิทธิ์สงวนไว้ 👕</p>
          </footer>
        </div>
      </StoreProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
