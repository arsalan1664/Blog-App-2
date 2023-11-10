import Blog from "./components/Blog";
import Navbar from "./components/Navbar";
import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom'
import { Register } from "./components/Register";
import {
  Login
} from "./components/Login";
import MyBlog from "./components/MyBlog";
import Footer from "./components/Footer";
import { CreateBlog } from "./components/CreateBlog";
import { ReactNode, useEffect } from 'react';


interface ProtectedProps {
  children: ReactNode;
}

export function Protected({ children }: ProtectedProps): ReactNode {
  const navigate = useNavigate();
  const userid = localStorage.getItem('id');
  if (!userid) {
    useEffect(() => navigate('/login'), [userid])
  }
  return userid && (
    <>{children}</>
  )
}

export function ProtectedUser({ children }: ProtectedProps): ReactNode {
  const navigate = useNavigate();
  const userid = localStorage.getItem('id');
  if (userid) {
    useEffect(() => navigate('/'), [userid])
  }
  return !userid && (
    <>{children}</>
  )
}


function App() {

  return (
    <div className="relative h-screen w-screen bg-background text-foreground">
      <Navbar />
      <Routes>
        <Route path='/login'
          element={<ProtectedUser><Login /></ProtectedUser>} />
        <Route path='/register'
          element={<ProtectedUser><Register/></ProtectedUser>} />
        <Route path='/'
          element={<Blog />} />
        <Route path='/my-blog'
          element={<Protected><MyBlog /></Protected>} />
        <Route path='/create-blog'
          element={<Protected><CreateBlog /></Protected>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
