import React from 'react'
import {Carousel} from "react-bootstrap"
const CarouselMovie = (props) => {
    return (
        <>
        <Carousel>
            {props.movies.map(m => (
                <Carousel.Item  key={m.id} interval={10000} style={{height: "80vh"}} >
                    <img
                    className="d-block w-100"
                    src={`https://image.tmdb.org/t/p/original${m.backdrop_path}`}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>{m.title}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
        </>
    )
}

export default CarouselMovie
