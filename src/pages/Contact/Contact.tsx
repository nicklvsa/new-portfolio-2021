import React from "react";

const Contact = () => {
    interface ContactFormValues {
        name: {value: string};
        email: {value: string};
        message: {value: string};
    };

    const contactFormSubmitted = (evt: React.FormEvent) => {
        evt.preventDefault();

        const target = evt.target as (EventTarget & ContactFormValues);
        if (target.name.value === '' || target.email.value === '') {
            alert('Please provide a valid name and email address!');
            return;
        }

        if (target.message.value === '') {
            alert('Please provide a valid message!');
            return;
        }
    };

    return (        
        <form className="mt-6" onSubmit={contactFormSubmitted}>
            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <div className="control has-icons-left has-icons-right">
                        <input className="input" type="text" name="name" placeholder="Name" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-user"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-asterisk"></i>
                        </span>
                    </div>
                </div>
                <p className="help">Please enter your name so I know who you are!</p>
            </div>
            <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input" type="email" name="email" placeholder="Email" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-asterisk"></i>
                    </span>
                </div>
                <p className="help">Please enter your email so I can get back to you!</p>
            </div>
            <div className="field">
                <label className="label">Message</label>
                <div className="control">
                    <textarea className="textarea" name="message" placeholder="Your message"></textarea>
                </div>
                <p className="help">Type your message here!</p>
            </div>
            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link" type="submit">Submit</button>
                </div>
                <div className="control">
                    <button className="button is-link is-light">Cancel</button>
                </div>
            </div>
        </form>
    );
};

export default Contact;
