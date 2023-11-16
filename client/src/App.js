import Home from './pages/Home/Home.jsx';
import Login from './pages/Login';
import Register from './pages/Register';
import Messenger from './pages/Messenger/Messenger.jsx';
import './style.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

import AddPost from './components/AddPost/AddPost';
import Layout from './pages/Layout/index.jsx';
import Profile from './pages/Profile/Profile.jsx';
import ApprovePost from './pages/ApprovePost/ApprovePost.jsx';
function App() {
    const { currentUser } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to='/login' />;
        }

        return children;
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'>
                    <Route
                        path='/'
                        element={
                            <ProtectedRoute>
                                <Layout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path='create-post' element={<AddPost />} />
                        <Route path='approve-post' element={<ApprovePost />} />
                        <Route index path='home' element={<Home />} />
                        <Route path='messenger/' element={<Messenger />} />
                        <Route path='messenger/:id' element={<Messenger />} />
                        <Route path='profile' element={<Profile />} />
                    </Route>
                </Route>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
