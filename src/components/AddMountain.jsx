import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams} from 'react-router-dom';


function AddTrail(props) {
    
    const navigate = useNavigate();
    const [continent, setContinent] = useState('');
    const [country, setCountry] = useState('');
    const [mountain_name, setMountain_Name] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [distance, setDistance] = useState('');
    const [average_time, setAverage_Time] = useState('')
    const [start_point, setStart_Point] = useState('');
    const [end_point, setEnd_Point] = useState('');
    const [season, setSeason] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [maps, setMaps] = useState('');
    const [conditions, setConditions] = useState('');
    const [accomodation, setAccomodation] = useState('');
    const [overview, setOverview] = useState('');
    const [loading, setLoading] = useState(false);

    const handleContinent = (e) => setContinent(e.target.value);
    const handleCountry = (e) => setCountry(e.target.value);
    const handleMountain_Name = (e) => setMountain_Name(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);
    const handleDistance = (e) => setDistance(e.target.value);
    const handleAverage_time = (e) => setAverage_Time(e.target.value);
    const handleStart_point = (e) => setStart_Point(e.target.value);
    const handleEnd_point = (e) => setEnd_Point(e.target.value);
    const handleSeason = (e) => setSeason(e.target.value);
    const handleDifficulty = (e) => setDifficulty(e.target.value);
    const handleMaps = (e) => setMaps(e.target.value);
    const handleAccomodation = (e) => setAccomodation(e.target.value);
    const handleConditions = (e) => setConditions(e.target.value);
    const handleOverview = (e) => setOverview(e.target.value);

    const handleUpload = async (e) => {
        try {
            setLoading(true);
            //form data === enctype=multipart/formdata
            const uploadData = new FormData();
            //add the file to the formData
            uploadData.append('image', e.target.files[0])
             //send the file to the api
             const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, uploadData);

             console.log(response.data.fileUrl)
             setImage(response.data.fileUrl)
             setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const storedToken = localStorage.getItem('authToken');
            await axios.post(`${process.env.REACT_APP_API_URL}/mountains`, {
                continent,
                country,
                mountain_name,
                image,
                description,
                distance,
                average_time,
                start_point,
                end_point,
                season,
                difficulty,
                maps,
                conditions,
                accomodation,
                overview
            }, {headers: {Authorization: `Bearer ${storedToken}`}})
            //clear the inputs
            setContinent('');
            setCountry('');
            setMountain_Name('');
            setImage('');
            setDescription('');
            setDistance('');
            setAverage_Time('');
            setStart_Point('');
            setEnd_Point('');
            setSeason('');
            setDifficulty('');
            setMaps('');
            setConditions('');
            setAccomodation('');
            setOverview('');

            navigate("/mountains")

        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className='AddTrail'>
        <form onSubmit={handleSubmit}>

            <label htmlFor="continent">Continent:</label>
            <input type="text" name="continent" value={continent} onChange={handleContinent} />

            <label htmlFor="country">Country:</label>
            <input type="text" name="country" value={country} onChange={handleCountry} />

            <label htmlFor="mountain">Mountain:</label>
            <input type="text" name="mountain" value={mountain_name} onChange={handleMountain_Name} />

            <label htmlFor="image">Image:</label>
            <input type="file" name="image" onChange={handleUpload} />

            <label htmlFor="description">Description:</label>
            <input type="text" name="description" value={description} onChange={handleDescription} />

            <label htmlFor="distance">Distance:</label>
            <input type="text" name="distance" value={distance} onChange={handleDistance} />

            <label htmlFor="average_time">Average Time:</label>
            <input type="text" name="average_time" value={average_time} onChange={handleAverage_time} />

            <label htmlFor="start_point">Start Point:</label>
            <input type="text" name="start_point" value={start_point} onChange={handleStart_point} />

            <label htmlFor="end_point">End Point:</label>
            <input type="text" name="end_point" value={end_point} onChange={handleEnd_point} />

            <label htmlFor="season">Season:</label>
            <input type="text" name="season" value={season} onChange={handleSeason} />

            <label htmlFor="difficulty">Difficulty:</label>
            <input type="text" name="difficulty" value={difficulty} onChange={handleDifficulty} />

            <label htmlFor="maps">Maps:</label>
            <input type="text" name="maps" value={maps} onChange={handleMaps} />

            <label htmlFor="conditions">Conditions:</label>
            <input type="text" name="conditions" value={conditions} onChange={handleConditions} />

            <label htmlFor="accomodation">Accomodation:</label>
            <input type="text" name="accomodation" value={accomodation} onChange={handleAccomodation} />

            <label htmlFor="overview">Overview:</label>
            <input type="text" name="overview" value={overview} onChange={handleOverview} />


            {loading ? <p>Loading...</p> :<button type='submit'>Add your trail !</button>}

        </form>
    </div>
  )
}

export default AddTrail