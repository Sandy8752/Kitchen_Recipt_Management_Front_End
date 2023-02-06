import { Routes, Route } from "react-router-dom";
import AddRecipe from "./components/Dashboard/AddRecipe";
import Forgot from "./components/Auth/Forgot";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Profile from "./components/Dashboard/Profile";
import Recipe from "./components/Recipe";
import RecipeByUser from "./components/Dashboard/RecipeByUser";
import Reset from "./components/Auth/Reset";
import Signup from "./components/Auth/Signup";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
export const CLIENT_URL = "https://kitchen-recipt-management-front-end.vercel.app/";
export const url = "https://kitchen-recipe-management-back-end.onrender.com/";
// export const url = "http://localhost:7000";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot_password" element={<Forgot />} />
        <Route path="/reset_password/:accessToken" element={<Reset />} />
        <Route path="/home" element={<Home />} />
        <Route path="/favorites" element={<Home />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/userRecipes" element={<RecipeByUser />} />
        <Route path="/updateRecipe/:id" element={<AddRecipe />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
