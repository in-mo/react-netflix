import React from "react";
import Banner from "../../components/Banner";
import Row from "../../components/Row";
import requests from "../../api/requests";

const MainPage = () => {
  return (
    <>
      <Banner />
      <Row title="NETFLIX ORIGINALS" id="NO" fetchUrl={requests.fetchNetflixOrgiginals} isLargeLow/>
      <Row title="Trending Now" id="TN" fetchUrl={requests.fectchTrending} />
      <Row title="Action Movies" id="AM" fetchUrl={requests.fetchActionMovies} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchNetflixOrgiginals} />
      <Row title="Comedy Movies" id="CM" fetchUrl={requests.fetchComedyMovies} />
    </>
  );
}

export default MainPage;