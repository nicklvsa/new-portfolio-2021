import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';

import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Resume from './pages/Resume/Resume';

import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import { useState, useEffect } from 'react';

import { useSpring, animated } from 'react-spring';
import Projects from './pages/Projects/Projects';
import Socials from './pages/Socials/Socials';

const App = () => {
	const [dark, setDark] = useState<boolean>(false);

	useEffect(() => {
		const head = document.head;
		const link = document.createElement('link');

		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.href = dark ? 'https://unpkg.com/bulma-prefers-dark' : 'https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css';

		head.appendChild(link);

		return () => { 
			head.removeChild(link) 
		};
	}, [dark]);

	const props = useSpring({
		to: {
			opacity: 1,
		},
		from: {
			opacity: 0,
		}
	});

	return (
		<Router>
			<animated.div className="App" style={props}>
				<header>
					<Nav darkModeCallback={(isDark: boolean) => {
						setDark(isDark);
					}}/>
				</header>
				<main className="container main-container">
					<Switch>
						<Route path="/about">
							<h1 className="has-text-centered is-size-1">About</h1><hr/>
							<About/>
						</Route>
						<Route path="/contact">
							<h1 className="has-text-centered is-size-1">Contact Me</h1><hr/>
							<Contact/>
						</Route>
						<Route path="/resume">
							<h1 className="has-text-centered is-size-1">My Resume</h1><hr/>
							<Resume/>
						</Route>
						<Route path="/projects">
							<h1 className="has-text-centered is-size-1">Projects</h1><hr/>
							<Projects/>
						</Route>
						<Route path="/socials">
							<h1 className="has-text-centered is-size-1">Socials</h1><hr/>
							<Socials/>
						</Route>
						<Route path="/">
							<h1 className="has-text-centered is-size-1">Home</h1><hr/>
							<Home/>
						</Route>
					</Switch>
				</main>
				
				<footer>
					<Footer/>
				</footer>
			</animated.div>
		</Router>
	);
};

export default App;
