import './Home.css';
import { useSpring, animated } from 'react-spring';

const Home = () => {
    const props = useSpring({
        to: {
            opacity: 1,
        },
        from: {
            opacity: 0,
        }
    });

    return (
        <div className="home-container">
            <animated.section style={props} className="hero slidein-hero">
                <div className="hero-body">
                    <p className="title">
                        Nick's Desk
                    </p>
                    <p className="subtitle slidein-title">
                        Welcome to my desk!
                    </p>
                </div>
            </animated.section>
        </div>
    );
};

export default Home;
