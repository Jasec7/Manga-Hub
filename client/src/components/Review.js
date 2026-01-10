

function Review({id, reviewer, comment, rating, onDelete}){
    return(
        <div>
            <h4>{reviewer}</h4>
            <p>{comment}</p>
            <p>Rating: {rating}</p>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    )
}

export default Review;