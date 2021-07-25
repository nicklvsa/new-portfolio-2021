import { getSupabaseClient } from "../../utils/sharedSupabase";
import React, { useEffect, useRef } from "react";
import { ToastProvider, useToasts } from "react-toast-notifications";

interface ContactFormValues {
    name: {value: string};
    email: {value: string};
    message: {value: string};
};

const ContactToast = () => {
    const { addToast } = useToasts();

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);

    const contactFormSubmitted = async (evt: React.FormEvent) => {
        evt.preventDefault();

        const target = evt.target as (EventTarget & ContactFormValues);
        if (target.name.value === '' || target.email.value === '') {
            addToast('Please provide a valid name and email address!', {
                appearance: 'error',
            });
            return;
        }

        if (target.message.value === '') {
            addToast('Please provide a valid message!', {
                appearance: 'error',
            });
            return;
        }

        const { error } = await getSupabaseClient()
            .from('contact_messages').
            insert([
                {
                    email: target.email.value,
                    name: target.name.value,
                    message: target.message.value,
                },
            ]);
        
        if (error) {
            addToast('Unable to create contact record!', {
                appearance: 'error',
            });
            return;
        }
    };
    
    useEffect(() => {
		const msgSubscription = getSupabaseClient()
            .from('contact_messages')
            .on('INSERT', payload => {
				if (payload.eventType === 'INSERT') {
                    const { email, name } = payload.new;
                    if (email === emailRef.current?.value && name === nameRef.current?.value) {
                        addToast('Successfully sent message!', {
                            appearance: 'success',
                        });

                        if (nameRef.current) nameRef.current.value = '';
                        if (emailRef.current) emailRef.current.value = '';
                        if (messageRef.current) messageRef.current.value = '';
                    }
				}
            }).subscribe(); 

		return () => {
			msgSubscription.unsubscribe();
		};
	}, []);

    return (
        <form className="mt-6" onSubmit={contactFormSubmitted}>
            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <div className="control has-icons-left has-icons-right">
                        <input className="input" type="text" name="name" placeholder="Name" ref={nameRef} />
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
                    <input className="input" type="email" name="email" placeholder="Email" ref={emailRef} />
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
                    <textarea className="textarea" name="message" placeholder="Your message" ref={messageRef}></textarea>
                </div>
                <p className="help">Type your message here!</p>
            </div>
            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link" type="submit">Submit</button>
                </div>
            </div>
        </form>
    )
};
 
const Contact = () => {
    return (     
        <ToastProvider>
            <ContactToast/>
        </ToastProvider>
    );
};

export default Contact;
