import React, { useEffect } from "react";
import "./favorite.css";
import axios from "axios";
import { useState } from "react";
import { Popover } from "antd";
import { IMAGE_BASE_URL } from "../../Config";

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);
  useEffect(() => {
    fetchFavoritedMovie();
  }, []);

  const fetchFavoritedMovie = () => {
    axios
      .post("/api/favorite/getFavoriteMovie", {
        useFrom: localStorage.getItem("userId"),
      })
      .then((response) => {
        if (response.data.success) {
          // console.log(response);
          setFavorites(response.data.favorites);
        } else {
          alert("failed to bring your favorite");
        }
      });
  };

  const onClickRemove = (movieId, userFrom) => {
    const variable = {
      movieId,
      userFrom,
    };
    axios
      .post("/api/favorite/removeFromFavorite", variable)
      .then((response) => {
        if (response.data.success) {
          fetchFavoritedMovie();
        } else {
          alert("failed to remove favorite list");
        }
      });
  };

  const renderCards = Favorites.map((item, index) => {
    const content = (
      <div>
        {" "}
        {item.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w400${item.moviePost}`} />
        ) : (
          "No Image"
        )}
      </div>
    );
    return (
      <tr key={index}>
        <Popover content={content} title={`${item.movieTitle}`}>
          <td>{item.movieTitle}</td>
        </Popover>
        <td>{item.movieRuntime} mins</td>
        <td>
          <button onClick={() => onClickRemove(item.movieId, item.userFrom)}>
            Remove
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2>Favorite Movies</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <td>Remove from favorite</td>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
