import axios from "axios";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Navbar from "../Navbar";
import { url } from "../../App";

function AddRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  let [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");

  const { id } = useParams();
  // console.log(id);

  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(recipeName, description, ingredients, instructions, image);

    // TODO: ingredients convert into array

    if (
      recipeName !== "" &&
      description !== "" &&
      ingredients !== "" &&
      instructions !== "" &&
      image !== ""
    ) {
      if (id) {
        let array = ingredients.split(",");
        // console.log(array);
        let result = await axios.put(
          `${url}/users/updateRecipe/${id}`,
          {
            recipeName,
            description,
            ingredients: array,
            instructions,
            image,
          },
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (result.data.statusCode === 200) {
          alert(result.data.message);
          navigate("/userRecipes");
          // console.log(result.data);
        } else {
          alert(result.data.message);
        }
      } else {
        let array = ingredients.split(",");
        // console.log(array);
        let res = await axios.post(
          `${url}/users/addRecipe`,
          {
            recipeName,
            description,
            ingredients: array,
            instructions,
            image,
          },
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.data.statusCode === 200) {
          alert("Recipe Posted Successfully!");
          navigate("/userRecipes");
          // console.log(res.data.addRecipe);
        } else {
          alert(res.data.message);
        }
      }
    } else {
      alert("Fill all fields");
    }
  };

  useEffect(() => {
    if (id) {
      fetch(`${url}/users/recipe/${id}`)
        .then((data) => data.json())
        .then((res) => {
          setRecipeName(res.recipe.recipeName);
          setDescription(res.recipe.description);
          setIngredients(res.recipe.ingredients);
          setInstructions(res.recipe.instructions);
          setImage(res.recipe.image);
        })
        .catch((err) => alert(err));
    }
  }, [id]);

  return (
    <>
      <Navbar />
      {token ? (
        <>
          <h2 className="text-center mt-3">
            {id ? <>UPDATE</> : <>ADD</>} RECIPE
          </h2>
          <div className="">
            <form className="container-fluid" onSubmit={handleSubmit}>
              <div className="add-wrapper  m-3 p-5">
                <div className=" m-3 d-flex justify-content-center">
                  <TextField
                    name="recipeName"
                    required
                    id="outlined-required"
                    label="Recipe Name"
                    className="col-md-6 text-wrapper"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                  />
                </div>
                <div className="m-3 d-flex justify-content-center">
                  <TextField
                    name="description"
                    required
                    id="outlined-textarea"
                    label="Description"
                    className="col-md-6 text-wrapper"
                    multiline
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="m-3 d-flex justify-content-center">
                  <TextField
                    name="ingredients"
                    required
                    id="outlined-textarea"
                    label="Ingredients"
                    placeholder="Enter required Ingredients seperated by commas"
                    className="col-md-6 text-wrapper"
                    multiline
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                </div>
                <div className="m-3 d-flex justify-content-center">
                  <TextField
                    name="instructions"
                    id="outlined-textarea"
                    label="Instructions"
                    placeholder="Enter procedure"
                    className="col-md-6 text-wrapper"
                    multiline
                    required
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                  />
                </div>
                <div className="m-3 d-flex justify-content-center">
                  <TextField
                    required
                    name="image"
                    id="outlined-required"
                    label="Image"
                    alt="Image"
                    className="col-md-6 text-wrapper"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <div className="m-3 d-flex justify-content-center">
                  <Button
                    type="submit"
                    variant="contained"
                    className="align-center col-md-6"
                  >
                    {id ? <>Update Recipe</> : <>Post Recipe</>}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div>Please Login</div>
      )}
    </>
  );
}

export default AddRecipe;