import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userForm;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRuntime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  let variable = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRuntime,
  };

  useEffect(() => {
    //add one whenever it is clicked

    // get the number of favorite
    axios.post("/api/favorite/favoriteNumber", variable).then((response) => {
      setFavoriteNumber(response.data.favoriteNumber);

      if (response.data.success) {
      } else {
        alert("failed to load favorite number");
      }
    });

    axios.post("/api/favorite/favorited", variable).then((response) => {
      if (response.data.success) {
        console.log("favorited", response.data);
        setFavorited(response.data.favorited);
      } else {
        alert("failed to load favorite number");
      }
    });
  }, []);
  // add and remove the number of favorite
  const onClickFavorite = () => {
    if (Favorited) {
      axios
        .post("/api/favorite/removeFromFavorite", variable)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert("failed to remove favorite number from the  favorite list");
          }
        });
    } else {
      axios.post("/api/favorite/addToFavortie", variable).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("failed to add favorite number from the favorite list");
        }
      });
    }
  };

  return (
    <div>
      {/* if favorite is true */}
      <Button onClick={onClickFavorite}>
        {Favorited ? "Not Favorited" : "Add to Favorite"}
        &nbsp; {FavoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
