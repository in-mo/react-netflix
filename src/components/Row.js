import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import "./Row.css"
import MovieModal from "./MovieModal";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Scrollbar, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Row = ({isLargeLow, title, id, fetchUrl}) => {

    const BASE_URL = "https://image.tmdb.org/t/p/original/";

    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSeleted, setMovieSelected] = useState({});

    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
        return request;
    }

    const handleClickDetail = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    }

    useEffect(() => {
        fetchMovieData();
    }, []);

    return (
        <section className="row">
            <h2>{title}</h2>
            {/* <div className="slider">
                <div className="slider__arrow-left"
                    onClick={() => {document.getElementById(id).scrollLeft -= window.innerWidth - 80}}>
                    <span className="arrow">
                        {"<"}
                    </span>
                </div> */}
                <Swiper 
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    loop={true}
                    // spaceBetween={50}
                    // slidesPerView={5}
                    navigation
                    pagination={{ clickable: true }}
                    // scrollbar={{ draggable: true }}
                    // onSwiper={(swiper) => console.log(swiper)}
                    // onSlideChange={() => console.log('slide change')}
                    breakpoints={{
                        1378: { 
                            slidesPerView: 6,
                            slidesPerGroup: 6,
                        },
                        998: { 
                            slidesPerView: 5,
                            slidesPerGroup: 5,
                        },
                        625: { 
                            slidesPerView: 4,
                            slidesPerGroup: 4,
                        },
                        0: { 
                            slidesPerView: 3,
                            slidesPerGroup: 3,
                        }
                    }}
                >
                <div id={id} className="row__posters">
                    {movies?.map((movie) => (
                        <SwiperSlide>
                            <img 
                                key={movie.id}
                                className={`row__poster ${isLargeLow && "row__posterLarge"}`}
                                src={`${BASE_URL}${isLargeLow ? movie.poster_path : movie.backdrop_path}`}
                                // loading="lazy"
                                alt={movie.name}
                                onClick={() => handleClickDetail(movie)}
                        /> 
                        </SwiperSlide>                        
                    ))}
                </div>
                </Swiper>
                {/* <div className="slider__arrow-right" 
                    onClick={() => {document.getElementById(id).scrollLeft += window.innerWidth - 80}}>
                    <span className="arrow">
                        {">"}
                    </span>
                </div>
            </div> */}
            {modalOpen && <MovieModal {...movieSeleted} setModalOpen={setModalOpen}/>}
        </section>
    )
}

export default Row;