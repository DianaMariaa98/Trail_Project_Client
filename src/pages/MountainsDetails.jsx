import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/auth.context';



function MountainsDetails() {
    const [mountain, setMountain] = useState(null);
    const [userId, setUserId] = useState('');

    const {id} = useParams();
    const {user} = useContext(AuthContext);
    

    const getMountain = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/mountains/${id}`);
            setUserId(response.data.userId)
            setMountain(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMountain();
    }, []);
  return (
    <div className = "MountainDetails">
        {mountain && (
            <>
            <h1>{mountain.mountain_name}</h1>
            <h2>{mountain.country}</h2>
            <img className="description_image"src ={mountain.image}></img>
            <p className="p_details">Description: {mountain.description}</p>
            <p className="p_details">Distance: {mountain.distance}</p>
            <p className="p_details">Average Time: {mountain.average_time}</p>
            <p className="p_details">Start Point: {mountain.start_point}</p>
            <p className="p_details">End Point: {mountain.end_point}</p>
            <span>Season:</span><p dangerouslySetInnerHTML={{ __html: mountain.season}}></p>
            <p className="p_details">Difficulty: {mountain.difficulty}</p>
            <span>Maps:</span><p dangerouslySetInnerHTML={{ __html: mountain.maps}}></p>
            <span>Books:</span><p dangerouslySetInnerHTML={{ __html: mountain.books_links}}></p>
            <span>Conditions:</span><p dangerouslySetInnerHTML={{ __html: mountain.conditions}}></p>
            <span>Accomodation:</span><p dangerouslySetInnerHTML={{ __html: mountain.accomodation}}></p>
            <span>Overview:</span><p dangerouslySetInnerHTML={{ __html: mountain.overview}}></p>
            
            {user._id === userId && <Link to={`/editTrail/${id}`}>Edit Trail</Link>}


            {/* <Link to={`/editTrail/${id}`}>Edit Trail</Link> */}

            </>
        )}
    </div>
  )
}

export default MountainsDetails;