import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';

const Compose: React.FC<ComposeProps> = () => {

    const history = useHistory();

    const [username, setUsername] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)
    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)

    const submitChirp = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let res = await fetch('/api/chirps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, message })
        })
        if (res.ok) {
            history.push('/');
        } else {
            console.log('something went wrong unu')
        }
    }

    return (
        <main className="container">
            <section className="row my-2 justified-content-center">
                <div className="col-md-8">
                    <form className="form-group p-3 shadow border rounded">
                        <label htmlFor="username">Username</label>
                        <input
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="Who be chirpin? Lol ecks dee"
                            id="username"
                            type="text"
                            className="form-control"
                        />
                        <label htmlFor="message">Message</label>
                        <textarea
                            value={message}
                            onChange={handleMessageChange}
                            rows={8}
                            placeholder="What you be chirpin, B? <o/"
                            className="form-control"
                            name="message"
                            id="message"
                        />
                        <button
                            onClick={submitChirp}
                            className="btn btn-outline-primary btn-block mt-3 w-75 mx-auto shadow-sm">
                            Chirp that ish man!
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
};

interface ComposeProps { }

export default Compose;