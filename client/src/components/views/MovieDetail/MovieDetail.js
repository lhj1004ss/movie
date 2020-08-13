import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Section/MainImage";
import MovieInfo from "./Section/MovieInfo";
import Card from "../commons/Card";
import { Row } from "antd";

function MovieDetail(props) {
  let movieId = props.match.params.movieId;

  const [Movie, setMovie] = useState([]);
  const [Actor, setActor] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);
  useEffect(() => {
    console.log(props.match);

    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovie(response);
      });

    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        console.log("crew response", response);
        setActor(response.cast);
      });
  }, []);

  const toggleToSeeActor = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <div>
      {/* header */}
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        description={Movie.overview}
      />
      {/* body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        {/* info */}
        <MovieInfo movie={Movie} />
        <br />
        {/* actor grid */}
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button onClick={toggleToSeeActor}>about actors</button>
        </div>

        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Actor &&
              Actor.map((item, index) => (
                <React.Fragment key={index}>
                  <Card
                    image={
                      item.profile_path
                        ? `${IMAGE_BASE_URL}w500${item.profile_path}`
                        : null
                    }
                    actorName={item.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
