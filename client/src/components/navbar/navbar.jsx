import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './navbar.module.css';
import { LuSearch } from "react-icons/lu";


const Navbar = () => {
    const location = useLocation();
    const [spanStyle, setSpanStyle] = useState({ left: 0, width: 0 });
    const [isSearchActive, setIsSearchActive] = useState(false);
    const navRef = useRef(null);
    const logoRef = useRef(null);
    const inputRef = useRef(null);

    // navigation links
    const navLinks = [
        { path: "/", name: "Home" },
        { path: "/Aboutus", name: "About Us" },
        { path: "/Articles", name: "Articles" },
        { path: "/Donation", name: "Donation" },
        { path: "/Contactus", name: "Contact Us" }
    ];

    const updateSpanPosition = (index) => {
        const links = navRef.current?.querySelectorAll('a');
        if (!links || !links[index]) return;

        setSpanStyle({
            left: links[index].offsetLeft,
            width: links[index].offsetWidth
        });
    };
    // index finder
    useEffect(() => {
        const activeIndex = navLinks.findIndex(link =>
            location.pathname === link.path
        );
        if (activeIndex >= 0) {
            updateSpanPosition(activeIndex);
        }
        if (location.pathname !== "/") {
            setIsSearchActive(false);
        }
    }, [location.pathname]);

    // search box focus
    useEffect(() => {
        if (isSearchActive && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchActive]);


    // logo loader
    useEffect(() => {
        const handleLogoLoad = () => {
            const activeIndex = navLinks.findIndex(link =>
                location.pathname === link.path
            );
            updateSpanPosition(activeIndex >= 0 ? activeIndex : 0);
        };

        if (logoRef.current.complete) {
            handleLogoLoad();
        } else {
            logoRef.current.addEventListener('load', handleLogoLoad);
        }

        return () => {
            if (logoRef.current) {
                logoRef.current.removeEventListener('load', handleLogoLoad);
            }
        };
    }, []);

    return (
        <header className={`${styles.header} ${isSearchActive ? styles.blur : ''}`}>
            <nav className={styles.navbody} ref={navRef}
                onMouseLeave={() => {
                    if (location.pathname === "/Donation") {
                        setSpanStyle({ left: 0, width: 0 });
                    }
                }}>

                <img
                    ref={logoRef}
                    src="./src/assets/logo-transparent.png"
                    alt="Logo"
                    className={styles.logo}
                />
                <span style={spanStyle}></span>

                {navLinks.map((link, index) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={link.path === "/Donation" ? styles.donationBorder : ""}
                        onMouseEnter={() => {
                            if (link.path === "/Donation") return;
                            updateSpanPosition(index);
                        }}
                        onMouseLeave={() => {
                            const activeIndex = navLinks.findIndex(l =>
                                location.pathname === l.path && l.path !== "/Donation"
                            );
                            if (activeIndex >= 0) {
                                updateSpanPosition(activeIndex);
                            }
                        }}
                    >
                        {link.name}
                    </Link>
                ))}
                {location.pathname === "/Articles" && (
                    <div className={`${styles.searchBox} ${isSearchActive ? styles.active : ''}`}>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search"
                            onBlur={() => setIsSearchActive(false)}
                        />
                        <button onClick={() => setIsSearchActive(!isSearchActive)}>
                            <LuSearch />
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;