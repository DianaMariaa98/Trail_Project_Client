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
    {showMountain? showMountain.map((mountain) => {
        return (
            <div className='mountains_list' key={mountain._id}>
                <Link className='link_mountain_name_list' to={`/mountains/${mountain._id}`}>
                    <h3 className='mountain_name_list'>{mountain.mountain_name}</h3>
                    <img className ="mountain_list_img" src={mountain.image} alt="MountainDetImage"></img>
                </Link>
            </div>
        )
    }): 
    mountains.map((mountain) => {
        return (
            <div className='mountains_list' key={mountain._id}>
                <Link className='link_mountain_name_list' to={`/mountains/${mountain._id}`}>
                    <h3 className='mountain_name_list'>{mountain.mountain_name}</h3>
                    <img className ="mountain_list_img" src={mountain.image} alt="MountainDetImage"></img>
                </Link>
            </div>
        )
    })}
    
    </div>
  )
}



export default Mountains