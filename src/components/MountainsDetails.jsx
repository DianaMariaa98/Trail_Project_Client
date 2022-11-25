import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';


function MountainsDetails() {
    const [mountain, setMountain] = useState(null);

    const {id} = useParams();

    const getMountain = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/mountains/${id}`);

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
            <img src ={mountain.image}></img>
            <p>{mountain.description}</p>
            </>
        )}
    </div>
  )
}

export default MountainsDetails;