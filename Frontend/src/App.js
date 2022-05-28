import { Routes, Route } from "react-router-dom";
import "./App.css";
import AppIndex from "./pages/AppIndex.js";
import AppDetail from "./pages/AppDetail.js";
import Home from "./pages/Home.js";
import SignUp from "./pages/Signup";
import SignIn from "./pages/Signin";
import UserHome from "./pages/UserHome";
import SignOut from "./pages/SignOut";
import AddCredit from "./pages/AddCredit";
import Reserve from "./pages/Reserve";
import AppAbout from "./pages/AppAbout";
import AddIsland from "./pages/AddIsland";
import Settings from "./pages/Settings.js";
import ManageIslands from "./pages/ManageIslands";
import EditIsland from "./pages/EditIsland";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/user/signin" element={<SignIn />} />
        <Route exact path="/detail/:id" element={<AppDetail />} />
        <Route exact path="/user/signup" element={<SignUp />} />
        <Route exact path="/user/signout" element={<SignOut />} />
        <Route exact path="/list" element={<AppIndex />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<AppAbout />} />
        <Route exact path="/userhome"
          element={
            <ProtectedRoute isLoggedIn={sessionStorage.getItem("isAuthenticated")}>
              <UserHome />
            </ProtectedRoute>
          }
        />
        <Route exact path="/addcredit"
          element={
            <ProtectedRoute isLoggedIn={sessionStorage.getItem("isAuthenticated")}>
              <AddCredit />
            </ProtectedRoute>
          }
        />
        <Route exact path="/reserve" element={
            <ProtectedRoute isLoggedIn={sessionStorage.getItem("isAuthenticated")}>
              <Reserve />
            </ProtectedRoute>
          }
        />
        <Route exact path="/addisland" element={
            <ProtectedRoute isLoggedIn={sessionStorage.getItem("isAuthenticated")}>
              <AddIsland />
            </ProtectedRoute>
          }
        />
        <Route exact path="/settings" element={
            <ProtectedRoute isLoggedIn={sessionStorage.getItem("isAuthenticated")}>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route exact path="/manage" element={
          <ProtectedRoute isLoggedIn={sessionStorage.getItem("isAuthenticated")}>
            <ManageIslands />
          </ProtectedRoute>
        }
        />
        <Route exact path="/editisland" element={
          <ProtectedRoute isLoggedIn={sessionStorage.getItem("isAuthenticated")}>
            <EditIsland />
          </ProtectedRoute>
        }
        />
      </Routes>
    </div>
  );
}

export default App;
