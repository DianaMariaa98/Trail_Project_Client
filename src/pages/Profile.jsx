import { useContext , useEffect } from "react";
import { AuthContext } from "../contexts/auth.context";
import axios from "axios";
import { useState } from "react";
import { upload } from "@testing-library/user-event/dist/upload";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Profile() {
    
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [setProfilePicture] = useState('');
    const [loading, setLoading] = useState(false);
    const [loggedin, setLoggedin] = useState(false);

    const handleUpload = async (e) => {
        try {
            setLoading(true);
            const uploadData = new FormData();
            upload.append('profilePicture', e.target.files[0])
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, uploadData);

            console.log(response.data.fileUrl)
            setProfilePicture(response.data.fileUrl)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    
    const getProfile = async () => {
        try {
            const storedToken = localStorage.getItem(`authToken`)
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile`,{headers: {Authorization: `Bearer ${storedToken}`}});
            setProfile(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getProfile()
    }, [])

    const logout = () => {
        localStorage.removeItem('authToken');
        setLoggedin(false);
        navigate('/');
    }  
    return (
        <div className="ProfilePage">
            {profile && (
            <>
            <h1>Profile Page</h1>
            <p>{profile.name}</p>
            <label htmlFor="profilePicture">Profile Picture:</label>
            <input type="file" name="profilePicture" onChange={handleUpload} />
            <Link to="/trails">Create your own trail</Link>
            <button onClick={logout}>Log out</button>
            
            <p>Created Trails:</p>
            {profile.createdMountains.map((mountain)=> {
                return (
                    <div key ={mountain._id}>
                    <Link to={`/mountains/${mountain._id}`}>{mountain.country}</Link>
                    
                    </div>
                )
            })}
            
            </>
            )}
             
        </div>
    )
    
}



export default Profile