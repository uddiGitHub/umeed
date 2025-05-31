'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './navbar.module.css';
import { LuSearch } from "react-icons/lu";
import { TbHttpOptions } from "react-icons/tb";
import Image from 'next/image';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();
    const [spanStyle, setSpanStyle] = useState({ left: 0, width: 0 });
    const [isSearchActive, setIsSearchActive] = useState(false);
    const navRef = useRef(null);
    const inputRef = useRef(null);

    const navLinks = [
        { path: "/pages/home", name: "Home" },
        { path: "/pages/about_us", name: "About Us" },
        // { path: "/Articles", name: "Articles" },
        // { path: "/Newsletter", name: "Newsletter" },
        { path: "/Donation", name: "Donation" },
        { path: "/pages/contact", name: "Contact Us" }
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

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) setIsMenuOpen(false);
        };

        const debounce = (func, delay) => {
            let timer;
            return () => {
                clearTimeout(timer);
                timer = setTimeout(func, delay);
            };
        };

        const debouncedResize = debounce(handleResize, 150);

        window.addEventListener('resize', debouncedResize);
        return () => window.removeEventListener('resize', debouncedResize);
    }, []);

    useEffect(() => {
        const activeIndex = navLinks.findIndex(link => pathname === link.path);
        if (activeIndex >= 0) {
            updateSpanPosition(activeIndex);
        }
        if (pathname !== "/") {
            setIsSearchActive(false);
        }
    }, [pathname]);

    useEffect(() => {
        if (isSearchActive && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchActive]);

    return (
        <header className={`${styles.header} ${isSearchActive ? styles.blur : ''}`}>
            <nav className={styles.navbody} ref={navRef}
                onMouseLeave={() => {
                    if (pathname === "/Donation") {
                        setSpanStyle({ left: 0, width: 0 });
                    }
                }}>
                <div className={styles.navContainer}>
                    <Image
                        src="/Umeedlogo.png"
                        alt="Logo"
                        width={150}
                        height={50}
                        className={styles.logo}
                        priority
                        onLoadingComplete={() => {
                            const activeIndex = navLinks.findIndex(link => pathname === link.path);
                            updateSpanPosition(activeIndex >= 0 ? activeIndex : 0);
                        }}
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
                                href={link.path}
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
                                        pathname === l.path && l.path !== "/Donation"
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

                    {(pathname === "/Articles" || pathname === "/Newsletter") && (
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

export default React.memo(Navbar);
