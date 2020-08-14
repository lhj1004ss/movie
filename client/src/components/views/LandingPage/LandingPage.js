import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "./Section/MainImage";
import Card from "../commons/Card";
import { Row } from "antd";

function LandingPage() {
  const [Movies, setMovies] = useState([]);

  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    //   first page
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    fetchMovies(endPoint);
  }, []);

  const fetchMovies = (endPoint, loadMoreMovies) => {
    fetch(endPoint)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        setMovies([...Movies, ...response.results]);
        setMainMovieImage(response.results[0]);
        setCurrentPage(response.page);
        // set main image fixed after load more movies
        setMainMovieImage(MainMovieImage || response.results[0]);
      });
  };

  const loadMoreMovies = () => {
    //   next pages
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endPoint, true);
  };

  return (
    <>
      <div style={{ width: "100%", margin: "0" }}>
        {/* main page */}
        {MainMovieImage && (
          <MainImage
            image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
            title={MainMovieImage.original_title}
            description={MainMovieImage.overview}
          />
        )}

        <div style={{ width: "85%", margin: "1rem auto" }}>
          <h2>Movies </h2>
          <hr />
          {/* card */}
          <Row gutter={[16, 16]}>
            {Movies &&
              Movies.map((item, index) => (
                <React.Fragment key={index}>
                  <Card
                    landingPage
                    image={
                      item.poster_path
                        ? `${IMAGE_BASE_URL}w500${item.poster_path}`
                        : null
                    }
                    movieId={item.id}
                    movieName={item.original_title}
                  />
                </React.Fragment>
              ))}
          </Row>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMoreMovies}>More movies</button>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
