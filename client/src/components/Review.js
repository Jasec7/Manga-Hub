import React, {useState} from "react";

function Review({id, reviewer, comment, rating, onDelete, onReview}){
    const [isEdit, setIsEdit] = useState(false)
     
    return(
        <div>
             {!isEdit ? (
            <> 
            <h4>{reviewer}</h4>
            <p>{comment}</p>
            <p>Rating: {rating}</p>
            <button onClick={() => onDelete(id)}>Delete</button>
            <button onClick={() => onReview(id, {reviewer, comment, rating})}>Edit</button>
            </>
            ) : (
                <>
                <p>Edit Mode</p>
                <button onClick={() => setIsEdit(false)}>Cancel</button>
                </>
            )}
        </div>
    );
}

export default Review;