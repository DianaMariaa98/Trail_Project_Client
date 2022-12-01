import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/auth.context';
import Comment from '../components/Comment';
import heart_icon from '../images/heart-icon.png'


function MountainsDetails() {
    const [mountain, setMountain] = useState(null);
    const [userId, setUserId] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(null);
   
    const handleComment = (e) => setComment(e.target.value);

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
    }, []); //why putting comments here makes infinite loop

    //comment section
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const storedToken = localStorage.getItem('authToken');
            await axios.post(`${process.env.REACT_APP_API_URL}/comments`, {comment,user:user._id, trail:id}, {headers: {Authorization: `Bearer ${storedToken}`}})
            getComments();
            setComment('');

        } catch (error) {
            console.log(error);
        }
    }

    const getComments = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/comments`);

            const filteredComments = response.data.filter(comment => comment.trail === id)

            setComments(filteredComments);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getComments()
    }, [])

    //get the likes
    const addLikes = async () => {

        try {
            
         const storedToken = localStorage.getItem('authToken');
         const likes = await axios.post(`${process.env.REACT_APP_API_URL}/likes/${id}`, {userId:user._id}, {headers: {Authorization: `Bearer ${storedToken}`}}) 
         console.log(likes.data)
         
         
        } catch (error) {
            console.log(error);
        }

    }


  return (
    <div className = "mountainDetails">
        {mountain && (
            <>
            <div className='mount_description_writing'>
            <div className='mount_description'>
            <h1 className='mountain_name_det'>{mountain.mountain_name}</h1>
            <h2 className='mountain_country_det'>{mountain.country}</h2>
            </div>
            <img className="description_image" alt=""src ={mountain.image}></img>
            <div className='mount_description_writing'>
            <p className='mount_details_description'>{mountain.description}</p>
            <div className="div_det">
            <h4 className="mount_details">Distance:</h4><p className='p_class'>{mountain.distance}</p></div>
            <div className="div_det">
            <h4 className="mount_details">Average Time:</h4><p className='p_class'>{mountain.average_time}</p></div>
            <div className="div_det">
            <h4 className="mount_details">Start Point:</h4><p className='p_class'>{mountain.start_point}</p></div>
            <div className="div_det">
            <h4 className="mount_details">End Point:</h4><p className='p_class'>{mountain.end_point}</p></div>
            <h4 className="mount_details">Season:</h4><p className='p_class' dangerouslySetInnerHTML={{ __html: mountain.season}}></p>
            <div className="div_det">
            <h4 className="mount_details">Difficulty:</h4><p className='p_class'>{mountain.difficulty}</p></div>
            <h4 className="mount_details">Maps:</h4><p className='p_class'dangerouslySetInnerHTML={{ __html: mountain.maps}}></p>
            <h4 className="mount_details">Books:</h4><p className='p_class' dangerouslySetInnerHTML={{ __html: mountain.books_links}}></p>
            <h4 className="mount_details">Conditions:</h4><p className='p_class' dangerouslySetInnerHTML={{ __html: mountain.conditions}}></p>
            <h4 className="mount_details">Accomodation:</h4><p className='p_class'dangerouslySetInnerHTML={{ __html: mountain.accomodation}}></p>
            <h4 className="mount_details">Overview:</h4><p className='p_class'dangerouslySetInnerHTML={{ __html: mountain.overview}}></p>

            {user && user._id === userId && <Link to={`/editTrail/${id}`}>Edit Trail</Link>}
            
            </div>
            <Link to ="/profile"><button className="heart_like" onClick ={addLikes}>Add to favorites <img className="heart_like_img" alt="" src={heart_icon}></img></button></Link>
            </div>
            
            
            {/* {user._id === userId && <Link to={`/editTrail/${id}`}>Edit Trail</Link>} */}


            {/* <Link to={`/editTrail/${id}`}>Edit Trail</Link> */}

            </>
        )}
       {/*  <form onSubmit={handleSubmit}>
        <label htmlFor="continent"></label>
            <input type="text" name="continent" value={comment} onChange={handleComment} />
        <button type ="submit">Add comment</button>
        </form> */}
        
        <div className='form-commentbox'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="content"></label>
          <textarea name="content" cols="50" rows="10" onChange={handleComment}></textarea>
          <div> <button className='add-comment_btn' type='submit'>Add Comment</button></div>
        </form>
      </div>

        {comments && (
        comments.map((comment) => {
            return (
                <div key={comment._id}>
                    <Comment comment={comment} user = {user} getComments = {getComments} />

                </div>
            ) 
        }) 
    )}
  

    </div>
  )
}

export default MountainsDetails;