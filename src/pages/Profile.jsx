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
    const [profilePicture, setProfilePicture] = useState('');
    const [loading, setLoading] = useState(false);
    const [loggedin, setLoggedin] = useState(false);

    const handleUpload = async (e) => {
        try {
            setLoading(true);
            const uploadData = new FormData();
            upload.append('profilePicture', e.target.files[0])
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, uploadData);
            /* setProfile(response.data.fileUrl) */
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const storedToken = localStorage.getItem('authToken');
            await axios.put(`${process.env.REACT_APP_API_URL}/profile`, 
            { 
                profilePicture

            }, {headers: {Authorization: `Bearer ${storedToken}`}});
            
        //clear the inputs
        setProfilePicture('');
        navigate(`/`)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    /* const logout = () => {
        localStorage.removeItem('authToken');
        setLoggedin(false);
        navigate('/');
    }   */
    return (
        <div className="profilePage">
            {profile && (
            <>
            
            <div className="profiletogheter">
            <div className="profileName">
            
            <h1>Your profile page 😊</h1>
            <p>Hello there : {profile.name}</p>
            <form onSubmit={handleSubmit}>
            
            <label htmlFor="profilePicture"></label>
            <input type="file" name="profilePicture" onChange={handleUpload}/>
            <img className="profile_image"src={profile.profilePicture} alt="profile"/>
            
            {/* {profilePicture && <img src={profilePicture}></img>} */}
            
            </form>
            
            </div>
            </div>
            
            
            <div className="mountains_togheter">

            <div className ="profile_mountains">
            <p className="p_trails">Created Trails:</p>
            {profile.createdMountains.map((mountain)=> {
                return (
                    <div className="created_Trails" key ={mountain._id}>
                    <Link className="p_trails_link" to={`/mountains/${mountain._id}`}><p className="p_trails">{mountain.country}</p></Link>
                    <img className ="profile_likedimg"src={mountain.image}  alt=""/>
                    
                    </div>
                    
                )
            })}
            </div>

            
            <div className="liked_Trails">
            <p className="p_trails">Liked Trails:</p>
            {profile.likedMountains.map((mountain) => {
                return (
                    <div className='liked_Trails' key = {mountain._id}>
                     <Link className="p_trails_link"to={`/mountains/${mountain._id}`}><p className="p_trails">{mountain.mountain_name}</p></Link>
                     <img className ="profile_likedimg"src={mountain.image} alt=""/>
                    </div>
                    
                )
                
            })} </div>
            </div>
            
            
            </>
            )}
             
        </div>
    )
    
}



export default Profile