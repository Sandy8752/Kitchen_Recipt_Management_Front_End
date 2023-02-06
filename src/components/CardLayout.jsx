import React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import moment from "moment";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
// import ShareIcon from "@mui/icons-material/Share";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";

const CardLayout = ({ recipes, searchTerm, userId, handleLike }) => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid mt-3 ">
      <div className="recipe-wrapper row row-cols-sm-1 justify-content-center">
        {recipes
          // eslint-disable-next-line array-callback-return
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.recipeName.toLowerCase().includes(searchTerm.toLowerCase())
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
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {recipe.userName[0]}
                      </Avatar>
                    }
                    // action={
                    //   <IconButton aria-label="settings">
                    //     <MoreVertIcon />
                    //   </IconButton>
                    // }
                    title={
                      <span className=" fw-bolder fs-5">
                        {recipe.recipeName}
                      </span>
                    }
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
                  <CardContent>
                    <Typography
                      className="description-text lh-lg"
                      variant="body2"
                      color="text.secondary"
                    >
                      {recipe.description}
                    </Typography>
                  </CardContent>
                </div>
                <div className="text-end mt-2 mx-2 fst-italic">
                  - by {recipe.userName}
                </div>
                <div className="row">
                  <CardActions
                    disableSpacing
                    className="justify-content-between"
                  >
                    <div>
                      <IconButton
                        aria-label="Like"
                        onClick={() => handleLike(recipe._id)}
                      >
                        {recipe.likes.includes(userId) === true ? (
                          <FavoriteIcon style={{ fill: "red" }} />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>
                      <span className="mx-2">{recipe.likes.length}</span>
                    </div>

                    <div>
                      {/* <IconButton
                          aria-label="share"
                          onClick={() => handleShare(recipe._id)}
                        >
                          <ShareIcon />
                        </IconButton> */}
                      <IconButton
                        aria-label="recipe-details"
                        onClick={() => navigate(`/recipe/${recipe._id}`)}
                      >
                        <ReadMoreIcon
                          fontSize="large"
                          style={{ fill: "#595c5f" }}
                        />
                      </IconButton>
                    </div>
                  </CardActions>
                </div>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default CardLayout;