import React, {useState} from "react";

function Review({id, reviewer, comment, rating, onDelete, onReview}){
    const [isEdit, setIsEdit] = useState(false)
     const [isInput, setIsInput] = useState({
        reviewer:"",
        comment:"",
        rating:""
     })
    return(
        <div>
             {!isEdit ? (
            <> 
            <h4>{reviewer}</h4>
            <p>{comment}</p>
            <p>Rating: {rating}</p>
            <button onClick={() => onDelete(id)}>Delete</button>
            <button onClick={() => {setIsInput({reviewer, comment, rating}); setIsEdit(true)}}>Edit</button>
            </>
            ):(
                <>
                <input 
                type='text'
                value={isInput.reviewer}
                onChange={(e) => setIsInput({...isInput, reviewer: e.target.value})}/>

                <input
                type='text'
                value={isInput.comment}
                onChange={(e) => setIsInput({...isInput, comment: e.target.value})}/>

                <input 
                type='number'
                value={isInput.rating}
                onChange={(e) => setIsInput({...isInput, rating: e.target.value})}/>
                <button onClick={() =>{onReview(id, isInput);setIsEdit(false)}}>Save</button>
                <button onClick={() => setIsEdit(false)}>Cancel</button>
                </>
            )}
        </div>
    );
 }

export default Review;