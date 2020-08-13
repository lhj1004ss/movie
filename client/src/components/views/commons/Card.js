import React from "react";
import { Col } from "antd";

function Card(props) {
  return (
    <div>
      <Col lg={6} md={8} xs={24}>
        <div styple={{ position: "relative" }}>
          <a href={`/movie/${props.movieId}`}>
            <img
              style={{ width: "100%", height: "320px" }}
              src={props.image}
              alt={props.movieName}
            />
          </a>
        </div>
      </Col>
    </div>
  );
}

export default Card;
