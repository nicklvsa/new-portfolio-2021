import { Link } from 'react-router-dom';
import './Socials.css';

const Socials = () => {
    return (
        <div>
            <div className="mb-6">
                <section className="hero is-success">
                    <div className="hero-body">
                        <p className="title">Overview</p>
                        <p className="subtitle">
                            Thanks for checking out my portfolio! 
                            Below are a list of my current social profiles that you can browser and check out.
                            If you'd like to get in contact with me, please head over to the <Link to="/contact"><i>contact</i></Link> page.
                            There you send over your message and I will try to respond as soon as possible. You're always free to reach 
                            out to me via email, or via one of the social networks I listed below too.
                        </p>
                        <p>- Nick</p>
                    </div>
                </section>
            </div>
            <div className="tile is-ancestor is-justify-content-center is-align-content-center">
                <div className="tile is-vertical is-12">
                    <div className="tile">
                        <div className="tile is-parent is-vertical">
                            <article className="tile is-child notification is-twitter">
                                <p className="title">Twitter</p>
                                <p className="subtitle">
                                    Follow me on Twitter @<a href="https://twitter.com/nicklvsa">nicklvsa</a>
                                </p>
                            </article>
                        </div>
                        <div className="tile is-parent is-vertical">
                            <article className="tile is-child notification is-instagram">
                                <p className="title">Instagram</p>
                                <p className="subtitle">
                                    Follow me on Instagram @<a href="https://instagram.com/nick_gerancher">nick_gerancher</a>
                                </p>
                            </article>
                        </div>
                        <div className="tile is-parent is-vertical">
                            <article className="tile is-child notification is-github">
                                <p className="title">Github</p>
                                <p className="subtitle">
                                    Fork me on Github @<a href="https://github.com/nicklvsa">nicklvsa</a>
                                </p>
                            </article>
                        </div>
                        <div className="tile is-parent is-vertical">
                            <article className="tile is-child notification is-linkedin">
                                <p className="title">LinkedIn</p>
                                <p className="subtitle">
                                    Fork me on LinkedIn @<a href="https://linkedin.com/nicksdesk">nicksdesk</a>
                                </p>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Socials;
