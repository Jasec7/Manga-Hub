import { Link } from "react-router-dom";
import Review from "./Review";

function MangaDetails({manga}){
    return(
        <div className="details">
            <br/>
            <h2>{manga.title}</h2>
            <p>{manga.creator}</p>
            <p>{manga.release_year}</p>
            <p>Reviews: {manga.reviews.length}</p>
             {manga.reviews.map((review) =>(
                <Review key ={review.id}
                id={review.id}
                reviewer={review.reviewer}
                comment={review.comment}
                rating={review.rating} />

             ))}
        </div>
    )
};

export default MangaDetails