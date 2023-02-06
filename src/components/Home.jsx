import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { url } from "../App";
import Navbar from "./Navbar";
import CardLayout from "./CardLayout";
import { RecipeState } from "../context/RecipesProvider";

function Home() {
  // const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user");
  const userDetails = JSON.parse(user);
  const userId = userDetails.id;
  const location = useLocation();

  const { recipes, getAllRecipes, searchTerm, getFavRecipes } = RecipeState();

  const getData = async () => {
    if (location.pathname === "/home") {
      setLoading(true);
      getAllRecipes();
      setLoading(false);
    } else if (location.pathname === "/favorites") {
      setLoading(true);
      getFavRecipes();
      setLoading(false);
    }
  };

  const handleLike = async (id) => {
    const res = await axios.patch(
      `${url}/users/favRecipe`,
      { id: id },
      {
        headers: { Authorization: `${token}` },
      }
    );
    if (res.data.statusCode === 200) {
      getData();
    } else {
      alert("Error in Fetching Data");
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [location.pathname, token]);

  // console.log(recipes);
  if (!token) return <div> Please Login...</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <h2 className="mb-0 pb-0 text-center mt-2">
        {location.pathname === "/favorites" ? "Favorite Recipes" : ""}
      </h2>
      <CardLayout
        recipes={recipes}
        searchTerm={searchTerm}
        userId={userId}
        handleLike={handleLike}
      />
    </>
  );
}

export default Home;