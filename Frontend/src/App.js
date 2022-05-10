import './App.css';
import AppIndex from './pages/AppIndex.js';
import AppDetail from './pages/AppDetail.js';
import Home from './pages/Home.js';
import { Routes, Route } from "react-router-dom";
import SignUp from './pages/Signup';
import SignIn from './pages/Signin';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/user/signin" element={<SignIn />} />
        <Route exact path="/detail/:id" element={<AppDetail />} />
        <Route exact path="/user/signup" element={<SignUp />} />
        <Route exact path="/list" element={<AppIndex />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
