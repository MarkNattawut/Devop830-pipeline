import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  // โหลดข้อมูลจาก localStorage เมื่อ app start
  useEffect(() => {
    const savedUsers = localStorage.getItem('allUsers');
    const savedUser = localStorage.getItem('user');

    if (savedUsers) {
      try {
        const parsed = JSON.parse(savedUsers);
        // หากมีข้อมูลเก่า ให้เช็ค admin password และ update เป็นรหัสปัจจุบันที่ตั้งไว้
        const adminIndex = parsed.findIndex(u => u.role === 'admin');
        if (adminIndex === -1) {
          setDefaultUsers();
          return;
        }

        const updated = [...parsed];
        if (updated[adminIndex].password !== '123456') {
          updated[adminIndex].password = '123456';
          localStorage.setItem('allUsers', JSON.stringify(updated));
        }

        setUsers(updated);
      } catch (error) {
        console.error('Error loading users:', error);
        setDefaultUsers();
      }
    } else {
      setDefaultUsers();
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }
  }, []);

  // ฟังก์ชันตั้งค่า default users (รวม admin)
  const setDefaultUsers = () => {
    const defaultUsers = [
      {
        id: 1,
        email: 'admin@sizentag.com',
        password: '123456',
        name: 'Admin',
        role: 'admin'
      },
      {
        id: 2,
        email: 'user@example.com',
        password: 'password123',
        name: 'Test User',
        role: 'user'
      }
    ];
    setUsers(defaultUsers);
    localStorage.setItem('allUsers', JSON.stringify(defaultUsers));
  };

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return { success: true, message: 'ล็อกอินสำเร็จ ✓' };
    }
    return { success: false, message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง ❌' };
  };

  const signup = (name, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return { success: false, message: 'รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน ❌' };
    }

    if (users.some(u => u.email === email)) {
      return { success: false, message: 'อีเมลนี้ถูกใช้งานแล้ว ❌' };
    }

    const newUser = {
      id: users.length + 1,
      email,
      password,
      name
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    // บันทึก users ลง localStorage
    localStorage.setItem('allUsers', JSON.stringify(updatedUsers));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    return { success: true, message: 'สมัครสมาชิกสำเร็จ ✓' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
