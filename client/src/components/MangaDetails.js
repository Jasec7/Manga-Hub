import { Link } from "react-router-dom";
import React, {useState} from 'react';
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import ChapterForm from "./ChapterForm";
import Chapter from "./Chapter";

function MangaDetails({manga}){
    const [mangaData, setMangaData] = useState(manga)
    console.log("Data:", mangaData)

    function refetchManga() {
    fetch(`/mangas/${manga.id}`)
      .then(r => r.json())
      .then(updatedManga => setMangaData(updatedManga));
    }



    return(  
        <div className="details">
            <br/>
            <h2>{mangaData.title}</h2>
            <p>{mangaData.creator}</p>
            <p>{mangaData.release_year}</p>

            <h2>Chapters</h2>
            {mangaData.manga_chapters.map((mangachapter) =>(
                <Chapter key={mangachapter.id} 
                manga_chapter={mangachapter} /> ))}
                
            <p>Reviews: ({mangaData.reviews.length})</p>
             {mangaData.reviews.map((review) =>(
                <Review key ={review.id}
                id={review.id}
                reviewer={review.reviewer}
                comment={review.comment}
                rating={review.rating} />
             ))}
             <ChapterForm onUpdate={refetchManga}
             manga_id={mangaData.id}/>
             <ReviewForm onUpdate={refetchManga}
             manga_id={mangaData.id} />
        </div>
    )
};

export default MangaDetails