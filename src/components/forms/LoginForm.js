import React from 'react';

function LoginForm({ credentials, setCredentials, handleSubmit, message }) {
    return(
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <input
                type='email'
                placeholder='Email'
                value={credentials.email}
                onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                />
                <input
                type='password'
                placeholder='Password'
                value={credentials.password}
                onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                />
                <button type='submit'>Log In</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default LoginForm;