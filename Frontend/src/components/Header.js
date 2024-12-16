// src/components/Header.js

/**
 * This component represents the navigation bar (Header) for the application.
 * It includes links to navigate between different dashboards and a logout button.
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ userRole }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user session and redirect to login
        localStorage.removeItem('userToken');
        navigate('/login');
    };

    return (
        <header style={styles.header}>
            <div style={styles.logo}>Newspaper Distribution System</div>

            <nav style={styles.navLinks}>
                {userRole === 'admin' && <Link to="/admin" style={styles.link}>Admin Dashboard</Link>}
                {userRole === 'main-distributor' && <Link to="/main-distributor" style={styles.link}>Main Distributor Dashboard</Link>}
                {userRole === 'sub-distributor' && <Link to="/sub-distributor" style={styles.link}>Sub Distributor Dashboard</Link>}
                {userRole === 'retailer' && <Link to="/retailer" style={styles.link}>Retailer Dashboard</Link>}
                {userRole === 'producer' && <Link to="/producer" style={styles.link}>Producer Dashboard</Link>}

                <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
            </nav>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#282c34',
        padding: '10px 20px',
        color: 'white',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    navLinks: {
        display: 'flex',
        gap: '15px',
        alignItems: 'center',
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
};

export default Header;
