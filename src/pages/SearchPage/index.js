import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./SearchPage.css";
import useDebounce from "../../hooks/useDebounce";

const SearchPage = () => {
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const searchTerm=query.get("q");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    useEffect(()=> {
        if(debouncedSearchTerm) {
            fetecSearchMovie(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    const fetecSearchMovie = async (searchTerm) => {
        try {
            const request = await axios.get(
                `/search/multi?include_adult=false&query=${searchTerm}`
            );
            setSearchResults(request.data.results);
        } catch (error) {
            console.log("error", error);
        }
    }
    
    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <section className="search_container">
                {searchResults.map((movie) => {
                    if(movie.backdrop_path !== null && movie.media_type !== "person") {
                        const movieImageUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;

                        return (
                            <div className="movie" key={movie.id} onClick={()=>navigate(`/${movie.id}`)}>
                                <div className="movie__column-poster">
                                    <img src={movieImageUrl} alt="movie" className="movie__poster"/>
                                </div>
                            </div> 
                        )
                    }

                })}
            </section>
        ) : (
            <sectino className="no-results">
                <div className="no-results__text">
                    <p>
                        찾고자하는 검색어"{debouncedSearchTerm}"에 맞는 영화가 없습니다.
                    </p>
                </div>
            </sectino>
        )
    }

    return renderSearchResults();
}

export default SearchPage;