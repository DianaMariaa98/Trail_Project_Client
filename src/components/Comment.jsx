import { useState, useEffect, useContext } from 'react';
import axios from "axios";

function Comment(props) {
    const {getComments} = props;
    const {comment} = props;
    const {user} = props;
    const [commentMessage, setCommentMessage] = useState('');
    const [display, setDisplay] = useState(true);

    const handleCommentMessage = (e) => setCommentMessage(e.target.value);
    const handleDisplay = () => setDisplay(!display)

    const deleteComment = async () => { 
        try {
            const storedToken = localStorage.getItem(`authToken`);
            await axios.delete(`${process.env.REACT_APP_API_URL}/comments/${comment._id}`,{headers: {Authorization: `Bearer ${storedToken}`}});
            getComments();
        } catch (error) {
            console.log(error)
        }

    }

    const editComment = async (e) => {
        e.preventDefault();
        try {
            const storedToken = localStorage.getItem(`authToken`);
            await axios.put(`${process.env.REACT_APP_API_URL}/comments/${comment._id}`, {comment: commentMessage}, {headers: {Authorization: `Bearer ${storedToken}`}});

            handleDisplay();
            getComments();
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        {/*  */}
        {display && 
        <p className='comment'>{comment.comment}</p>
        } 
        {!display && <form onSubmit={editComment}>
        <label htmlFor="commentMessage"></label>
        <input type="text" name="commentMessage" value={commentMessage} onChange={handleCommentMessage}/>
        <button type='submit'>Edit comment</button>
        </form>}
        {user._id === comment.user && 
        <>
        <button onClick={handleDisplay}>Edit</button>
        <button onClick={deleteComment}>Delete</button>
        </> 
        }
        
    </div>
  )
}

export default Comment