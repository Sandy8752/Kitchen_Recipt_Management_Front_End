import axios from "axios";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../Navbar";
import { url } from "../../App";
import { RecipeState } from "../../context/RecipesProvider";

function RecipeByUser() {
  // const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user");
  const userDetails = JSON.parse(user);
  const tokenUser = userDetails.id;
  const navigate = useNavigate();
  const { searchTerm, recipes, setRecipes } = RecipeState();

  const getRecipes = async () => {
    if (tokenUser) {
      setLoading(true);
      const userRecipes = recipes.filter(
        (recipes) => recipes.userId === tokenUser
      );
      setRecipes(userRecipes);
    } else {
      alert("Token Invalid/Expired");
      navigate("/signin");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    // console.log(id);
    let text = `Confirm Delete?`;
    if (window.confirm(text) === true) {
      let res = await axios.delete(`${url}/users/removeRecipe/${id}`, {
        headers: { Authorization: `${token}` },
      });
      if (res.data.statusCode === 200) {
        alert(res.data.message);
        getRecipes();
      } else {
        alert(res.data.message);
        navigate("/userRecipes");
      }
    } else {
      alert("Delete cancelled");
    }
  };

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line
  }, []);

  if (!tokenUser) return <div> Please Login...</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div>
        <h2 className="text-center mt-3">Posted Recipes</h2>
        <div className="container-fluid mt-3 ">
          {recipes?.length > 0 ? (
            <div className="row row-cols-sm-1 justify-content-center">
              {recipes
                // eslint-disable-next-line array-callback-return
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val.recipeName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((recipe, index) => {
                  return (
                    <Card
                      className="card-wrapper m-4 container shadow bg-white rounded"
                      sx={{ maxWidth: 400 }}
                      key={index}
                    >
                      <div className="row">
                        <CardHeader
                          className="col"
                          avatar={
                            <Avatar
                              sx={{ bgcolor: red[500] }}
                              aria-label="recipe"
                            >
                              {recipe.userName[0]}
                            </Avatar>
                          }
                          action={
                            <IconButton aria-label="settings">
                              <MoreVertIcon />
                            </IconButton>
                          }
                          title={recipe.recipeName}
                          subheader={moment(recipe.createdAt).fromNow()}
                        />
                      </div>
                      <div className="row">
                        <CardMedia
                          component="img"
                          height="194"
                          image={recipe.image}
                          alt={recipe.recipeName}
                          className="col"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(`/recipe/${recipe._id}`)}
                        />
                      </div>
                      <div className="row description-wrapper">
                        <CardContent className="">
                          <Typography
                            className="description-text"
                            variant="body2"
                            color="text.secondary"
                          >
                            {recipe.description}
                          </Typography>
                        </CardContent>
                      </div>
                      <div className="row">
                        <CardActions
                          disableSpacing
                          className="justify-content-between"
                        >
                          <div>
                            <IconButton
                              aria-label="Edit"
                              color="primary"
                              onClick={() =>
                                navigate(`/updateRecipe/${recipe._id}`)
                              }
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              aria-label="Delete"
                              color="warning"
                              onClick={() => handleDelete(recipe._id)}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </div>
                          <div>
                            <IconButton
                              aria-label="recipe-details"
                              onClick={() => navigate(`/recipe/${recipe._id}`)}
                            >
                              <ArrowCircleRightIcon fontSize="large" />
                            </IconButton>
                          </div>
                        </CardActions>
                      </div>
                    </Card>
                  );
                })}
            </div>
          ) : (
            <div className="text-center">
              No Recipes found!{" "}
              <span
                className="text-success"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/addRecipe")}
              >
                {" "}
                Want to add Recipe?{" "}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default RecipeByUser;