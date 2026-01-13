import React, {useState} from "react";

function Review({id, reviewer, comment, rating, onDelete, onReview}){
    const [isToggle, setIstoggle] = useState(false);

    function handleToggle(){
        setIstoggle(!isToggle)
    };
    console.log('pushed:',isToggle)
    return(
        <div>
            <button onClick={handleToggle}>
                {isToggle ? 'Hide review' : 'Show review'}
            </button>
            {isToggle && ( <div><h4>{reviewer}</h4>
            <p>{comment}</p>
            <p>Rating: {rating}</p>
            <button onClick={() => onReview(id, {reviewer, comment, rating})}>Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button> </div>)}
        </div>
    )
}

export default Review;