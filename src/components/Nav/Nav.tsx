import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from 'react-dark-mode-toggle';

interface NavProps {
    darkModeCallback: (isDark: boolean) => any;
}

const Nav = (props: NavProps) => {
    const [isBurgerActive, setBurgerActive] = useState<boolean>(false);
    const [isDarkMode, setDarkMode] = useState<boolean>(false);

    const burgerNavClicked = () => {
        setBurgerActive(active => !active);
    };

    useEffect(() => {
        props.darkModeCallback(isDarkMode);
    }, [props, isDarkMode]);

    return (
        <div>
            <nav className="navbar" role="navigation" aria-label="main navigation">
				<div className="navbar-brand">
					<a className="navbar-item" href="https://nicksdesk.com">
						<h1><strong>Nick's Desk</strong></h1>
					</a>
					<a role="button" 
                        className={!isBurgerActive ? "navbar-burger is-active" : "navbar-burger"}
                        aria-label="menu" 
                        aria-expanded="false" 
                        data-target="main-nav" 
                        onClick={burgerNavClicked}
                        href="#"
                    >
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</a>
				</div>
				<div 
                    id="main-nav" 
                    className={!isBurgerActive ? "navbar-menu is-active" : "navbar-menu"}
                >
					<div className="navbar-start">
						<Link to="/" className="navbar-item">Home</Link>
						<Link to="/about" className="navbar-item">About</Link>
						<Link to="/contact" className="navbar-item">Contact</Link>
						<div className="navbar-item has-dropdown is-hoverable">
							<a className="navbar-link" href="#">More</a>
							<div className="navbar-dropdown">
								<Link to="/resume" className="navbar-item">Resume</Link>
								<Link to="/projects" className="navbar-item">Projects</Link>
								<a className="navbar-item" href="#">Socials</a>
								<hr className="navbar-divider"/>
								<a className="navbar-item" href="#">Report an issue</a>
							</div>
						</div>
					</div>
					<div className="navbar-end">
						<div className="navbar-item">
							<div className="buttons">
								<DarkModeToggle
                                    onChange={() => {
                                        setDarkMode(mode => !mode);
                                    }}
                                    checked={isDarkMode}
                                    size={80}
                                />
							</div>
						</div>
					</div>
				</div>
			</nav>
        </div>
    );
};

export default Nav;
