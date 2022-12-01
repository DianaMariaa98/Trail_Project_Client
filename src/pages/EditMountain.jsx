import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate} from 'react-router-dom';
import { AuthContext } from '../contexts/auth.context';


function EditMountain() {
    const [continent, setContinent] = useState('');
    const [country, setCountry] = useState('');
    const [mountain_name, setMountain_Name] = useState('');
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
    const [userId, setUserId] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    
    
    const { id } = useParams();
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    
    

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

    const getMountain = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/mountains/${id}`);
            
            setContinent(response.data.continent);
            setCountry(response.data.country);
            setMountain_Name(response.data.mountain_name);
            setDescription(response.data.description);
            setDistance(response.data.distance);
            setAverage_Time(response.data.average_time);
            setStart_Point(response.data.start_point);
            setEnd_Point(response.data.end_point);
            setSeason(response.data.season);
            setDifficulty(response.data.difficulty);
            setMaps(response.data.maps);
            setConditions(response.data.conditions);
            setAccomodation(response.data.accomodation);
            setOverview(response.data.overview);
            setUserId(response.data.userId)
            

            console.log(response.data)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMountain();
    },[])

   
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
            await axios.put(`${process.env.REACT_APP_API_URL}/mountains/${id}`, 
            { 
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
                overview,

            }, {headers: {Authorization: `Bearer ${storedToken}`}});
            
        //clear the inputs
        setContinent('');
        setCountry('');
        setMountain_Name('');
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
        setImage('');

        navigate(`/mountains/${id}`)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteMountain = async () => {
        try {
           const storedToken = localStorage.getItem(`authToken`)
           await axios.delete(`${process.env.REACT_APP_API_URL}/mountains/${id}`,{headers: {Authorization: `Bearer ${storedToken}`}});
           navigate('/mountains')
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='editTrail'>
        <div className='editTrail_sec'>
        <form onSubmit={handleSubmit}>
            <div className='add_trail'>
            <h1 className='add_mountain_title'>Want to make some changes?</h1>


            <label className='edit_trail_second' htmlFor="continent">Continent:</label>
            <div className='edit_trail_second'>
            <input className='edit_Trail_input' type="text" name="continent" value={continent} onChange={handleContinent} />
            </div>

            
            <label className='edit_trail_second' htmlFor="country">Country:</label>
            <div className='edit_trail_second'>
            <input className='edit_Trail_input' type="text" name="country" value={country} onChange={handleCountry} />
            </div>

            
            <label className='edit_trail_second' htmlFor="image">Image:</label>
            <div className='edit_trail_second'>
            <input className='edit_Trail_input' type="file" name="image" onChange={handleUpload} />
            </div>

            
            <label className='edit_trail_second'>Mountain:</label>
            <div className='edit_trail_second'>
            <input className='edit_Trail_input' type="text" name="mountain" value={mountain_name} onChange={handleMountain_Name} />
            </div>

            
            <label className='edit_trail_second' htmlFor="description">Description:</label>
            <div className='edit_trail_second'>
            <textarea className='edit_Trail_input'
              name="description"
              value={description}
              cols="30"
              rows="10"
              onChange={handleDescription}
            ></textarea>
            </div>

            <label className='edit_trail_second' htmlFor="distance">Distance:</label>
            <div className='edit_trail_second'>
            <input className='edit_Trail_input' type="text" name="distance" value={distance} onChange={handleDistance} />
            </div>


            <label className='edit_trail_second'>Average Time:</label>
            <div className='edit_trail_second'>
            <input className='edit_Trail_input' type="text" name="average_time" value={average_time} onChange={handleAverage_time} />
            </div>

            <label className='edit_trail_second' htmlFor="start_point">Start Point:</label>
            <div className='edit_trail_second'>
            <input className='edit_Trail_input' type="text" name="start_point" value={start_point} onChange={handleStart_point} />
            </div>

            <label className='edit_trail_second' htmlFor="end_point">End Point:</label>
            <div className='edit_trail_second'>
            <input className='edit_Trail_input' type="text" name="end_point" value={end_point} onChange={handleEnd_point} />
            </div>

            <label className='edit_trail_second' htmlFor="season">Season:</label>
            <div className='edit_trail_second'>
            <input className='edit_Trail_input' type="text" name="season" value={season} onChange={handleSeason} />
            </div>

            <label className='edit_trail_second' htmlFor="difficulty">Difficulty:</label>
            <div className='edit_trail_second'>
            <input className='edit_Trail_input' type="text" name="difficulty" value={difficulty} onChange={handleDifficulty} />
            </div>

            <label className='edit_trail_second' htmlFor="maps">Maps:</label>
            <div className='edit_trail_second'>
            <input className='edit_Trail_input' type="text" name="maps" value={maps} onChange={handleMaps} />
            </div>

            <label className='edit_trail_second' htmlFor="conditions">Conditions:</label>
            <div className='edit_trail_second'>
            <textarea className='edit_Trail_input'
              name="conditions"
              value={conditions}
              cols="30"
              rows="7"
              onChange={handleConditions}
            ></textarea>
            </div>

            <label className='edit_trail_second' htmlFor="accomodation">Accomodation:</label>
            <div className='edit_trail_second'>
            <textarea className='edit_Trail_input'
              name="accomodation"
              value={accomodation}
              cols="30"
              rows="2"
              onChange={handleAccomodation}
            ></textarea>
            </div>

            <label className='edit_trail_second' htmlFor="overview">Overview:</label>
            <div className='edit_trail_second'>
            <textarea className='edit_Trail_input'
              name="overview"
              value={overview}
              cols="30"
              rows="2"
              onChange={handleOverview}
            ></textarea>
            </div>
            </div>

            <div className ='buttons_together_edit'>
            <div className='button_sign_addMountain'>
            {loading ? <p>Loading...</p> :user._id === userId && <button className="button_sign" type='submit'>Edit Trail</button>}
            {/* {user._id === userId && <button type='submit'>Edit Trail</button>} */}
            </div>

            <div className='button_sign_addMountain2'>
            {loading ? <p>Loading...</p> :user._id === userId && <p className="button_sign" onClick={deleteMountain}>
                Delete the trail !
            </p>}
            </div>
            </div>

        </form>
        </div>
       
    </div>
  )
}

export default EditMountain