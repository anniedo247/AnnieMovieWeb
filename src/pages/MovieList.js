import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import "../App.css";
import { useHistory } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import PublicNavBar from "../components/PublicNavBar";
import Header from "../components/Header";

const API_KEY = "3f8af128099b08ebdb593c5711c409c3";
const API_URL = "https://api.themoviedb.org/3";

const MovieList = ({ type }) => {
  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [ratingVal, setRatingVal] = useState({ min: 0, max: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMovies, setFilterMovies] = useState([]);
  const [sortType, setSortType] = useState('mostToLeastPopular');
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      let endpoint = "now_playing";
      if (type === "top_rated") {
        endpoint = "top_rated";
      }
      if (type === "upcoming") {
        endpoint = "upcoming";
      }
      const url = `${API_URL}/movie/${endpoint}?api_key=${API_KEY}&page=${pageNum}`;
      console.log(url);
      const respone = await fetch(url);
      const data = await respone.json();
      setMovies(data.results);
      setFilterMovies(data.results);
      setTotalPageNum(data.total_pages);
      console.log(movies);
    };
    fetchData();
  }, [type, pageNum]);

  const movieDetail = (id) => {
    history.push(`/movie/${id}`);
  };
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  };
  useEffect(() => {
    const newMovies = movies.filter((m) =>
      m.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilterMovies(newMovies);
  }, [searchTerm]);

  const sliderChange = (value) => {
    const newMovies = movies.filter(
      (m) => m.vote_average >= value.min && m.vote_average <= value.max
    );
    setFilterMovies(newMovies);
    setRatingVal(value);
  };

  useEffect(()=>{
    const copyMovies = [...movies]
    switch(sortType){
        case 'leastToMostPopular':
            copyMovies.sort((a,b)=>a.popularity-b.popularity);
            break;
        case 'highestToLowestRating':
            copyMovies.sort((a,b) => b.vote_average - a.vote_average);
            break;
        case 'lowestToHighestRating':
            copyMovies.sort((a,b) => a.vote_average - b.vote_average);
            break;
        default:
            break;
    }
    setFilterMovies(copyMovies);
  },[sortType,movies])

  const handleSelectSort=(e)=>{
    setSortType(e);
  }

  return (
    <div>
      <PublicNavBar
        handleSearchTermChange={handleSearchTermChange}
        searchTerm={searchTerm}
        handleSelect={handleSelectSort}
      />

      <div className="range">
        <InputRange
          maxValue={10}
          minValue={0}
          value={ratingVal}
          onChange={(value) => sliderChange(value)}
          className={'input-range__label--value input-range__track--active'}
        />
        Rating
      </div>

      <Container className="d-flex flex-wrap justify-content-between mb-5">
        {filterMovies.map((movie) => (
          <div onClick={() => movieDetail(movie.id)}>
            <Card key={movie.id} className=" mt-5" style={{ width: "18em" }}>
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  <span>{movie.release_date.substring(0, 4)}</span>
                </Card.Text>
                <Card.Text>
                  <span style={{ color: "red" }}>♥ </span>{" "}
                  <span>{movie.popularity}</span>
                  <span className="ml-3" style={{ color: "red" }}>
                    ⭐{" "}
                  </span>{" "}
                  <span>{movie.vote_average}</span>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Container>
      <PaginationBar
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPageNum={totalPageNum}
      />
    </div>
  );
};

export default MovieList;
