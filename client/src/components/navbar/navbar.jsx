import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './navbar.module.css';
import { LuSearch } from "react-icons/lu";
import { TbHttpOptions } from "react-icons/tb";


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
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

        setSpanStyle(isMobile ? {
            left: 0,
            width: '100%',
            top: links[index].offsetTop,
            height: links[index].offsetHeight
          } : {
            left: links[index].offsetLeft,
            width: links[index].offsetWidth,
          });
    };
    // mobile view
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) setIsMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
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

                <div className={styles.navContainer}>
                    <img
                        ref={logoRef}
                        src="./src/assets/logo-transparent-copy.png"
                        alt="Logo"
                        className={styles.logo}
                    />
                    <button
                        className={styles.hamburger}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <TbHttpOptions />
                    </button>
                    <div className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}>
                        <span style={spanStyle}></span>
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={link.path === "/Donation" ? styles.donationBorder : ""}
                                onClick={() => {
                                    if (isMobile) {
                                      setIsMenuOpen(false);
                                      updateSpanPosition(index);
                                    }
                                  }}
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
                    </div>
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
                </div>
                
            </nav>
        </header>
    );
};

export default Navbar;