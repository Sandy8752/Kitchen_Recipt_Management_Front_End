import axios from "axios";
import Avatar from "react-avatar";
import Button from "react-bootstrap/Button";
import copy from "copy-to-clipboard";
import Form from "react-bootstrap/Form";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import { CLIENT_URL } from "../App";
import { url } from "../App";
import "../App.css";

function Recipe() {
  const [recipe, setRecipe] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const location = useLocation();
  const { id } = useParams();
  // console.log(id);

  const getRecipe = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/users/recipe/${id}`);
      setRecipe(res.data.recipe);
      setComments(res.data.recipe.comments);
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(comment);
    try {
      const res = await axios.patch(
        `${url}/users/addComment/${id}`,
        { comment },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (res.data.statusCode === 200) {
        setComment("");
        getRecipe();
      } else {
        alert("Error adding comment");
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleShare = (id) => {
    copy(CLIENT_URL + location.pathname);
    alert(`Copied to ClipBoard URL - \n ${CLIENT_URL + location.pathname}`);
  };

  // console.log(recipe);
  // console.log(comments);

  useEffect(() => {
    getRecipe();
    // eslint-disable-next-line
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div>
          <h1 className="text-center my-3">{recipe.recipeName}</h1>
          <div>
            <div className="px-5  my-4 ">
              <div className="text-center d-flex flex-column flex-wrap justify-content-center align-items-center gap-5">
                <div>
                  <img
                    src={recipe.image}
                    alt={recipe.recipeName}
                    className="recipe-image shadow bg-white rounded img-fluid"
                  />
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="65"
                    height="50"
                    fill="#FFD700"
                    className="bi bi-hand-thumbs-up-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                  </svg>
                  <span className="fw-bolder">{recipe.likes?.length}</span>
                  <span style={{ cursor: "pointer" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="25"
                      fill="currentColor"
                      className="bi bi-share-fill ms-5"
                      viewBox="0 0 16 16"
                      onClick={handleShare}
                    >
                      <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col mx-5 px-5">
                <span className="me-4">
                  <b>Description: </b>
                </span>{" "}
                {recipe.description}
              </div>
            </div>
            <div className="row mb-4">
              <div className="col col mx-5 px-5">
                <span className="me-4">
                  <b>Ingredients: </b>
                </span>
                <div className="ms-5 ps-5">
                  {recipe?.ingredients?.map((e, i) => {
                    return (
                      <ul key={i}>
                        <li>{e}</li>
                      </ul>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col mx-5 px-5">
                <span className="me-4">
                  <b>Instructions: </b>
                </span>
                {recipe.instructions}
              </div>
            </div>
            <div className="row mb-4">
              <div className="col mx-5 px-5">
                <span className="me-4">
                  <b>Posted At: </b>
                </span>
                {moment(recipe.createdAt).format("Do MMMM YYYY, h:mm a")}
              </div>
            </div>
            <div className="row mb-4">
              <div className="col mx-5 px-5">
                <span className="me-4">
                  <b>Last updated At: </b>
                </span>
                {moment(recipe.updatedAt).format("Do MMMM YYYY, h:mm a")}
              </div>
            </div>
            <div className="row mb-4">
              <div className="col mx-5 px-5">
                <span className="me-4">
                  <b>Posted By: </b>
                </span>
                {recipe.userName}
              </div>
            </div>
          </div>
        </div>
        <hr />

        <div className="mx-5 px-4">
          <h2 className="">Comments</h2>
          <div>
            <div className="mx-3 my-4 px-3">
              {comments.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="d-grid align-items my-1 col-md-7 px-3"
                  >
                    <div className="row ">
                      <div className="col">
                        <Avatar
                          className="me-3"
                          name={e.userName[0]}
                          size="50"
                          round={true}
                          textSizeRatio={1.75}
                        />

                        <span className="fw-bolder">{e.userName}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col" style={{ textIndent: "65px" }}>
                        {e.comment}
                      </div>
                      <div className="col text-end me-3">
                        {moment(e.commentedAt).fromNow()}
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
          <Form
            onSubmit={handleSubmit}
            className="col-md-6 col-sm-12 mx-5 px-5"
          >
            <Form.Group className="">
              <Form.Label>Add Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                aria-describedby="comment"
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="mb-5">
                <Button
                  variant="outline-primary"
                  type="submit"
                  id="comment"
                  className="mt-2 "
                >
                  Comment
                </Button>
              </div>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Recipe;