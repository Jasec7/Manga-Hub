
import { useParams } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import ChapterForm from "./ChapterForm";
import Chapter from "./Chapter";
import {useHistory} from "react-router-dom";

function MangaDetails({onDelete}){
    const [mangaData, setMangaData] = useState();
    const [isToggle, setIstoggle] = useState(false);
    const {id} = useParams();
    const history = useHistory();

    useEffect(() =>{
        fetch(`/mangas/${id}`)
        .then(r => r.json())
        .then(mangaData => setMangaData(mangaData))
    },[id])

    if(!mangaData || !mangaData.manga_chapters){
        return null;
    };
    

    function refetchManga() {
    fetch(`/mangas/${id}`)
      .then(r => r.json())
      .then(updatedManga => setMangaData(updatedManga));
    };

    const handleMangaDelete = (id) =>{
    fetch(`/mangas/${id}`,{
        method:"DELETE"
    }).then(() =>{
        history.push("/mangas")

    });
};

    const handleReviewDelete = (id) => {
        fetch(`/reviews/${id}`,{
            method:"DELETE"
        })
        .then(() => refetchManga())
    };

    const handleChapterDelete = (id) =>{
        fetch(`/mangachapters/${id}`,{
            method:"DELETE"
        })
        .then(() => refetchManga())
    };
    
    function handleToggle(){
        setIstoggle(!isToggle)
    };
   
    const handleUpdateReview = (id, {reviewer, comment, rating}) =>{
        console.log("PATCH payload:", { reviewer, comment, rating });
        fetch(`/reviews/${id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({reviewer, comment, rating:Number(rating)})
        })
        .then((res) => {
          if(res.ok){
            refetchManga()
          }
        })
    };  

    return(  
        <div className="details">
            <br/>
            <h2>{mangaData.title}</h2>
            <p>{mangaData.creator}</p>
            <p>{mangaData.release_year}</p>
            <button onClick={() => handleMangaDelete(mangaData.id)}>Delete</button>
            <h2>Chapters</h2>
            {mangaData.manga_chapters.map((manga_chapter) =>(
                <Chapter key={manga_chapter.id} 
                manga_chapter={manga_chapter}
                onDelete={handleChapterDelete} 
                /> ))}
                
            <p>Reviews: ({mangaData.reviews.length})</p>
            <button onClick={handleToggle}>
                {isToggle ? 'Hide review' : 'Show review'}
            </button>
             {isToggle &&(mangaData.reviews.map((review) =>(
                <Review key ={review.id}
                id={review.id}
                reviewer={review.reviewer}
                comment={review.comment}
                rating={review.rating}
                onDelete={handleReviewDelete} 
                onReview={handleUpdateReview}/>
             )))}
             <ChapterForm onUpdate={refetchManga}
             manga_id={mangaData.id}/>
             <ReviewForm onUpdate={refetchManga}
             manga_id={mangaData.id} />
        </div>
    ) 
}
export default MangaDetails