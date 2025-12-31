import MangaDetails from "./MangaDetails"

function Review({id, reviewer, comment, rating}){
    return(
        <div>
            <h4>{reviewer}</h4>
            <p>{comment}</p>
            <p>Rating: {rating}</p>
        </div>
    )
}

export default Review;