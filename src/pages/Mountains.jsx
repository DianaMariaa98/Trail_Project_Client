import { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Mountains({showMountain}) {
    //declare the state
    const [mountains, setMountains] = useState([]);

    //function to call the API
    //getting the mountains

    const getMountains = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/mountains`);
            setMountains(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getMountains()
    }, [])
  return (
    <div className="MountainsListPage">
    <h1>List of Mountains:</h1>
    {showMountain? showMountain.map((mountain) => {
        return (
            <div key={mountain._id}>
                <Link to={`/mountains/${mountain._id}`}>
                    <h3>{mountain.mountain_name}</h3>
                </Link>
            </div>
        )
    }): 
    mountains.map((mountain) => {
        return (
            <div key={mountain._id}>
                <Link to={`/mountains/${mountain._id}`}>
                    <h3>{mountain.mountain_name}</h3>
                </Link>
            </div>
        )
    })}
    </div>
  )
}



export default Mountains