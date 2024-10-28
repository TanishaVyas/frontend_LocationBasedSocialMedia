//login.js
import React from 'react';

function Login() {
    return (
        <div>
            <h2>Login</h2>
            <button onClick={() => window.open('http://localhost:8080/auth/google', '_self')}>
                Login with Google
            </button>
        </div>
    );
}

export default Login;
