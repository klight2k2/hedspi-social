import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Messenger from "./pages/Messenger";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import AddPost from "./components/AddPost/AddPost";
import Layout from "./pages/Layout/index.jsx";
import Profile from "./pages/Profile/Profile.jsx";
function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<Layout />} >
          <Route path="create-post" element={<AddPost />} />
          <Route path="home" element={<Home />} />
          <Route path="messenger" element={<Messenger />} />
          <Route path="profile" element={<Profile />} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
