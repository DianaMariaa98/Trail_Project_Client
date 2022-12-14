import {useState, useContext} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from '../contexts/auth.context';


function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const navigate = useNavigate();
    const {storeToken, authenticateUser} = useContext(AuthContext);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            //try to create the user
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {email, password});

            //store the token that we got from the login request
            storeToken(response.data.authToken);

            //Validate the token
            authenticateUser();

            //redirect
            navigate('/')

        } catch (error) {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
        }
    }
  return (
    <div className='loginPage'>
        <h1>Login</h1>

        <form classname ="form_signup" onSubmit={handleLoginSubmit}>
            <div className='signup_det'>
            <label>Email:</label>
            <input className='input_sign' type="email" name="email" value={email} onChange={handleEmail} placeholder="traveller@gmail.com"/>

            <label>Password</label>
            <input className='input_sign' type ="password" name="password" value={password} onChange={handlePassword} placeholder="******"/>
            </div>
            <button className="button_sign" type="submit">Login</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className='p_sign'>Don't have an account yet?</p>
        <Link to="/signup">Sign Up</Link> 🙂
    </div>
  )
}

export default Login;