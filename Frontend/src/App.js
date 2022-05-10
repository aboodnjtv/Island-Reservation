import { Routes, Route } from "react-router-dom";
import './App.css';
import AppIndex from './pages/AppIndex.js';
import AppDetail from './pages/AppDetail.js';
import Home from './pages/Home.js';
import SignUp from './pages/Signup';
import SignIn from './pages/Signin';
import UserHome from './pages/UserHome';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/user/signin" element={<SignIn />} />
        <Route exact path="/detail/:id" element={<AppDetail />} />
        <Route exact path="/user/signup" element={<SignUp />} />
        <Route exact path="/list" element={<AppIndex />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/userhome" element={(
          <ProtectedRoute isLoggedIn={localStorage.getItem("isAuthenticated")}>
          <UserHome/>
          </ProtectedRoute>
        )} />
      </Routes>
    </div>
  );
}

export default App;
