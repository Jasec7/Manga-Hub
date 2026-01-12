import { Link } from "react-router-dom";
import React, {useState} from 'react';
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import ChapterForm from "./ChapterForm";
import Chapter from "./Chapter";

function MangaDetails({manga, onDelete}){
    const [mangaData, setMangaData] = useState(manga)
    console.log("Data:", mangaData)
    

    function refetchManga() {
    fetch(`/mangas/${manga.id}`)
      .then(r => r.json())
      .then(updatedManga => setMangaData(updatedManga));
    }

    if(!mangaData || !mangaData.manga_chapters){
        return null;
    };

    const handleReviewDelete = (id) => {
        fetch(`/reviews/${id}`,{
            method:"DELETE"
        })
        .then(() => refetchManga())
    };

    const handleUpdateReview = (id, {reviewer, comment, rating}) =>{
        fetch(`/reviews/${id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({reviewer, comment, rating})
        })
        .then((res) => {
          if (res.ok) {
            refetchManga()
          }   
    });

    const handleChapterDelete = (id) => {
        fetch(`/mangachapters/${id}`,{
            method:"DELETE"
        })
        .then(() => refetchManga())
    };
    
    return(  
        <div className="details">
            <br/>
            <h2>{mangaData.title}</h2>
            <p>{mangaData.creator}</p>
            <p>{mangaData.release_year}</p>
            <button onClick={() => onDelete(mangaData.id)}>Delete</button>
            <h2>Chapters</h2>
            {mangaData.manga_chapters.map((manga_chapter) =>(
                <Chapter key={manga_chapter.id} 
                manga_chapter={manga_chapter}
                onDelete={handleChapterDelete} 
                /> ))}
                
            <p>Reviews: ({mangaData.reviews.length})</p>
             {mangaData.reviews.map((review) =>(
                <Review key ={review.id}
                id={review.id}
                reviewer={review.reviewer}
                comment={review.comment}
                rating={review.rating}
                onDelete={handleReviewDelete} 
                onReview={handleUpdateReview}/>
             ))}
             <ChapterForm onUpdate={refetchManga}
             manga_id={mangaData.id}/>
             <ReviewForm onUpdate={refetchManga}
             manga_id={mangaData.id} />
        </div>
    )
}
}

export default MangaDetails