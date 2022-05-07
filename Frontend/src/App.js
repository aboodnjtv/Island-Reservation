import './App.css';
import AppIndex from './pages/AppIndex.js';
import AppDetail from './pages/AppDetail.js';
import Home from './pages/Home.js';
import AppAbout from './pages/AppAbout.js';
import { Routes, Route } from "react-router-dom";
import SignUp from './pages/Signup';
import Signin from './pages/Signin';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/user/signin" element={<Signin />} />
        <Route path="/detail/:id" element={<AppDetail />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/list" element={<AppIndex />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AppAbout />} />
      </Routes>
    </div>
  );
}

export default App;
