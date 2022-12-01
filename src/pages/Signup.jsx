import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Signup(props) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined)

    const navigate = useNavigate();

    const handlePassword = (e) => setPassword(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleName = (e) => setName(e.target.value);

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            //try to create the user
            await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {email, password, name});
            //redirect
            navigate('/login')
        } catch (error) {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
        }
    }
  return (
  <div className="signupPage">
    <h1>Sign up</h1>
    
    <form classname ="form_signup"onSubmit={handleSignupSubmit}>
        <div className='signup_det'>
        <label>Name:</label>
        <input className='input_sign' type="text" name="name" value={name} onChange={handleName} placeholder="traveller"/>

        <label>Email:</label>
        <input className='input_sign' type="email" name="email" value={email} onChange={handleEmail} placeholder="traveller@gmail.com"/>

        <label>Password</label>
        <input className='input_sign' type="password" name="password" value={password} onChange={handlePassword} placeholder="******"/>
        </div>
        <button className="button_sign" type="submit">Sign up</button>
        
    </form>

    {errorMessage && <p className="error-message">{errorMessage}</p>}

    
    <p className='p_sign'>Already have an account?</p>
    <Link to="/login">Login</Link> 🙂
  </div>

  );
}


export default Signup;