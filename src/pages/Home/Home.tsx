import './Home.css';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';

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
            <div className="slidein-container">
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
            <div className="home-main-container">
                <h1 className="page-title centered">Hello, my name is Nick!</h1>
                <p className="page-subtitle mt-5">
                    I'm a software engineer currently working for <Link to="https://mapbox.com">Mapbox</Link> helping to
                    build awesome mapping products! As a software engineer at Mapbox, I work on the Raster team helping
                    to design and build data ingestion pipelines as well as APIs to serve our internal and customer 
                    ingested data. My specialities include: API design, microservice architecture, data ingestion, 
                    and software infrastructure. Checkout my <Link to="/resume">resume</Link> and <Link to="/skills">skills list</Link> to read
                    more about what I do!
                </p>

                <h1 className="page-title centered" style={{marginTop: '100px'}}>My experience</h1>
                <div className="experience-list mt-5">
                    <div className="exp-item">
                        <article className="panel is-link">
                            <p className="panel-heading">
                                <a href="https://lcti.org">LCTI</a> - <small>Internship</small>
                            </p>
                            <div className="panel-block">
                                testing
                            </div>
                        </article>
                    </div> 
                    <div className="exp-item">
                        <article className="panel is-info">
                            <p className="panel-heading">
                                <a href="https://homehero.com">HomeHero</a> - <small>Internship</small>
                            </p>
                            <div className="panel-block">
                                testing
                            </div>
                        </article>
                    </div>
                </div>
                <div className="experience-list">
                    <div className="exp-item">
                        <article className="panel is-primary">
                            <p className="panel-heading">
                                <a href="https://homehero.com">HomeHero</a> - <small>Full time</small>
                            </p>
                            <div className="panel-block">
                                testing
                            </div>
                        </article>
                    </div> 
                    <div className="exp-item">
                        <article className="panel is-success">
                            <p className="panel-heading">
                                <a href="https://mapbox.com">Mapbox</a> - <small>Full time</small>
                            </p>
                            <div className="panel-block">
                                testing
                            </div>
                        </article>
                    </div>
                </div>
                <div className="experience-list">
                    <div className="exp-item">
                        <article className="panel is-primary">
                            <p className="panel-heading">
                                HomeHero - <small>Full time</small>
                            </p>
                            <div className="panel-block">
                                testing
                            </div>
                        </article>
                    </div> 
                    <div className="exp-item">
                        <article className="panel is-link">
                            <p className="panel-heading">
                                Mapbox - <small>Full time</small>
                            </p>
                            <div className="panel-block">
                                testing
                            </div>
                        </article>
                    </div>
                </div>
                <h1 className="page-title centered" style={{marginTop: '100px'}}>Featured projects</h1>
                <h3 className="subtitle centered">(Checkout all <Link to="/projects">my projects</Link>!)</h3>
                <div>
                    
                </div>
            </div>
        </div>
    );
};

export default Home;
