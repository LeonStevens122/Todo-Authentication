import React from "react";
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
const passport = require('passport');



const Login = ({ googleLogin }) => {
    console.log('Google Login : ', googleLogin);

    const loginGoogle = () => {
        console.log('running');
        Axios.get('http://localhost:3001/auth/google', passport.authenticate('google', {
            scope: ['profile']
        }
        )
        );
    }

    return (
        <div>

            <a className="google-btn" href='http://localhost:3001/auth/google'>Google+</a>

        </div>
        )
}

export default Login;