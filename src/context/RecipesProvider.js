import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { url } from "../App";

export const RecipesContext = createContext();

const RecipesProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [profile, setProfile] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const token = sessionStorage.getItem("token");

  const getProfile = async () => {
    if (token) {
      const res = await axios.get(`${url}/profile`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (res.data.statusCode === 200) {
        setProfile(res.data.user);
        // console.log(res.data.user);
      } else {
        alert("Error while fetching profile");
      }
    }
  };

  const getAllRecipes = async () => {
    if (token) {
      const res = await axios.get(`${url}/users/allRecipes`);
      // console.log(res.data.recipes);
      if (res.data.statusCode === 200) {
        setRecipes(res.data.recipes);
      } else {
        alert("Error in Fetching Data");
      }
    }
  };

  const getFavRecipes = async () => {
    if (token) {
      const res = await axios.get(`${url}/users/favRecipes`, {
        headers: { Authorization: `${token}` },
      });
      // console.log(res);
      if (res.data.statusCode === 200) {
        setRecipes(res.data.fav);
      } else {
        alert("Error in Fetching Data");
      }
    }
  };

  useEffect(() => {
    if (token) {
      getProfile();
      getAllRecipes();
      getFavRecipes();
    }
    // eslint-disable-next-line
  }, [token]);

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        setRecipes,
        getAllRecipes,
        profile,
        setProfile,
        getProfile,
        searchTerm,
        setSearchTerm,
        getFavRecipes,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export const RecipeState = () => {
  return useContext(RecipesContext);
};

export default RecipesProvider;