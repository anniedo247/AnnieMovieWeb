import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Media, Modal } from "react-bootstrap";
import PublicNavBar from "../components/PaginationBar";
import Header from "../components/Header";
import "../App.css";
import YouTube from "@u-wave/react-youtube";

const API_KEY = "3f8af128099b08ebdb593c5711c409c3";
const API_URL = "https://api.themoviedb.org/3";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [videos, setVideos] = useState([]);
  const [key, setKey] = useState("");
  const [show, setShow] = useState(false);
  let time = parseInt(movie.runtime);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${API_URL}/movie/${id}?api_key=${API_KEY}`;
      const respone = await fetch(url);
      const data = await respone.json();
      setMovie(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getVideo = async () => {
      const url = `${API_URL}/movie/${id}/videos?api_key=${API_KEY}`;
      const respone = await fetch(url);
      const data = await respone.json();
      console.log(data);
      setVideos(data.results);
      const video = data.results[Math.floor(Math.random() * videos.length)];
      setKey(video.key);
    };
    getVideo();
  }, []);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <div>     
      <div className="mt-5">
        <Container>
          <Media style={{ backgroundColor: "white" }}>
            <img
              width={300}
              className="mr-3"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="Generic placeholder"
            />
            <Media.Body className="body">
              <div className="ml-5">
                <h2>
                  <span style={{ fontWeight: "bolder" }}>{movie.title}</span>
                  <span>
                    ({movie.release_date && movie.release_date.substring(0, 4)})
                  </span>
                </h2>
                {movie.genres &&
                  movie.genres.map((e) => (
                    <span className="mx-2 mt-5 genres">{e.name}</span>
                  ))}
                <div className="mt-5">
                  <span>⭐ {movie.vote_average}</span>
                  <span className="ml-5">
                    {Math.floor(time / 60) + "h " + (time % 60) + "m"}
                  </span>
                  <button className="button" onClick={handleShow}>
                    ▶ Play Trailer
                  </button>
                  <Modal
                    show={show}
                    onHide={handleClose}
                    size="lg"
                    aria-labelledby="example-custom-modal-styling-title"
                  >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                      <YouTube
                        video={key}
                        autoplay
                        width="100%"
                        height="400px"
                      />
                    </Modal.Body>
                  </Modal>
                </div>
                <div
                  className="mt-5"
                  style={{ textAlign: "left", letterSpacing: "0.1em" }}
                >
                  <h4>Overview</h4>
                  <p>{movie.overview}</p>
                </div>
              </div>
            </Media.Body>
          </Media>
        </Container>
        <Container>" "</Container>
      </div>
    </div>
  );
};

export default MovieDetail;
