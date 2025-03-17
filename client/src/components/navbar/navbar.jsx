import React, { useState, useRef, useEffect } from 'react';
import styles from './navbar.module.css';

const Navbar = () => {
    const [spanStyle, setSpanStyle] = useState({ 
        left: 0, 
        width: 0 
    });
    const navRef = useRef(null);
    const logoRef = useRef(null); 

    const updateSpanStyle = (index) => {
        const links = navRef.current.querySelectorAll('a');
        if (!links[index]) return;
        
        const { offsetLeft, offsetWidth } = links[index];
        setSpanStyle({
            left: offsetLeft,
            width: offsetWidth
        });
    };

    useEffect(() => {
        const initializePosition = () => {
            if (logoRef.current.complete) {
                updateSpanStyle(0);
            } else {
                logoRef.current.addEventListener('load', () => updateSpanStyle(0));
            }
        };

        initializePosition();

        const resizeObserver = new ResizeObserver(() => updateSpanStyle(0));
        if (navRef.current) {
            resizeObserver.observe(navRef.current);
        }

        return () => {
            resizeObserver.disconnect();
            if (logoRef.current) {
                logoRef.current.removeEventListener('load', initializePosition);
            }
        };
    }, []);

    return (
        <header className={styles.header}>
            <nav className={styles.navbody} ref={navRef}>
                <img 
                    ref={logoRef}
                    src="./src/assets/logo.png" 
                    alt="Logo" 
                    className={styles.logo} 
                />
                <span style={spanStyle}></span>
                <a href="/" 
                   onMouseEnter={() => updateSpanStyle(0)}
                   onMouseLeave={() => updateSpanStyle(0)}>Home</a>
                   <a href="#" 
                   onMouseEnter={() => updateSpanStyle(1)}
                   onMouseLeave={() => updateSpanStyle(0)}>About Us</a>
                <a href="#" 
                   onMouseEnter={() => updateSpanStyle(2)}
                   onMouseLeave={() => updateSpanStyle(0)}>Articles</a>
                <a href="#" 
                   onMouseEnter={() => updateSpanStyle(3)}
                   onMouseLeave={() => updateSpanStyle(0)}>Donation</a>
                <a href="#" 
                   onMouseEnter={() => updateSpanStyle(4)}
                   onMouseLeave={() => updateSpanStyle(0)}>Contact Us</a>
            </nav>
        </header>
    );
};

export default Navbar;