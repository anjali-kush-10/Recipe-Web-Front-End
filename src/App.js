import { Route, Routes } from "react-router-dom";
import Container from "./components/layout/Container";
import Login from "./components/Login";
import Home from "./components/Home";
import VerifyOTP from "./components/VerifyOTP";
import CompleteProfile from "./components/CompleteProfile";
import ViewAllRecipes from "./components/ViewAllRecipes";
import ManageUsers from "./components/ManageUsers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewSingleRecipe from "./components/ViewSingleRecipe";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/view-all-recipes" element={<ViewAllRecipes />} />
        <Route path="/manage-all-users" element={<ManageUsers />} />
        <Route path="/view-recipe/:id" element={<ViewSingleRecipe />} />
      </Routes>
    </>
  );
}

export default App;
