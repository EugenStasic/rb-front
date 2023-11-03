import React from 'react';

function RegisterForm({ userData, setUserData, handleSubmit, message }) {
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder='Username'
                value={userData.username}
                onChange={e => setUserData({ ...userData, username: e.target.value })}
            />
            <input
                type='email'
                placeholder='Email'
                value={userData.email}
                onChange={e => setUserData({ ...userData, email: e.target.value })}
            />
            <input 
                type='password'
                placeholder='Password'
                value={userData.password}
                onChange={e => setUserData({ ...userData, password: e.target.value })}
            />
            <input
                type='password'
                placeholder='Confirm Password'
                value={userData.confirmPassword}
                onChange={e => setUserData({ ...userData, confirmPassword: e.target.value})}
            />
            <button type='submit'>Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default RegisterForm;