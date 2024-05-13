import React, { useEffect, useState } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";

const Nav = () => {

    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    }


    useEffect(()=> {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 50) {
                setShow(true);
            } else {
                setShow(false);
            }
        })

        return () => {
            window.removeEventListener("scroll", () => {});
        }
    })

    return (
        <nav className={`nav ${show && 'nav__black'}`}>
            <img 
                alt="Netflix log"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/200px-Netflix_2015_logo.svg.png"
                className="nav__logo"
                onClick={()=>window.location.reload()}
            />
            <input className="nav__input" value={searchValue} onChange={handleChange} type="text" placeholder="검색해주세요."/>
            <img 
                alt="User logged"
                src="https://ih0.redbubble.net/image.618427277.3222/flat,100x100,075,f.u2.jpg"
                className="nav__avatar"
            />
        </nav>
    )
}

export default Nav;