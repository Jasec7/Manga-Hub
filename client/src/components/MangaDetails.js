import { Link } from "react-router-dom";
import React, {useState} from 'react';
import Review from "./Review";
import ReviewForm from "./ReviewForm";

function MangaDetails({manga}){
    const [mangaData, setMangaData] = useState(manga)

    function handleReview(newReview){
        setMangaData({...mangaData,
            reviews:[...mangaData.reviews, newReview]
        })
    };
    return(
        <div className="details">
            <br/>
            <h2>{manga.title}</h2>
            <p>{manga.creator}</p>
            <p>{manga.release_year}</p>
            <p>Reviews: {mangaData.reviews.length}</p>
             {mangaData.reviews.map((review) =>(
                <Review key ={review.id}
                id={review.id}
                reviewer={review.reviewer}
                comment={review.comment}
                rating={review.rating} />
             ))}
             <ReviewForm onAddReview={handleReview}
              manga_id={manga.id} />
        </div>
    )
};

export default MangaDetails