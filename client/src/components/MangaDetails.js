
import { useParams } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import ChapterForm from "./ChapterForm";
import Chapter from "./Chapter";

//import {useHistory} from "react-router-dom";
import API_URL from "../api";

function MangaDetails(){
    const [mangaData, setMangaData] = useState(null);
    const [isToggle, setIstoggle] = useState(false);
    const [pickVolume, setPickVolume] = useState(null)
    const {id} = useParams();
    

    useEffect(() =>{
        fetch(`/mangas/${id}`)
        .then(r => r.json())
        .then(mangaData => setMangaData(mangaData))
    },[id])

    if(!mangaData || !mangaData.volumes){
        return null;
    };
    console.log(mangaData)

    
   /* const handleChapterDelete = (id) =>{
        fetch(`/mangachapters/${id}`,{
            method:"DELETE"
        })
        .then(() => refetchManga())
    };*/
    
    function handleToggle(){
        setIstoggle(!isToggle)
    };
   
 

    return(  
        <div className="details">
            <br/>
            <h2>{mangaData.title}</h2>
            <p>{mangaData.creator}</p>
            <p>{mangaData.release_year}</p>
            <img src={mangaData.image_url} alt={mangaData.title} className="manga-image"/>

            <hr/>
            {mangaData.volumes?.map((volume) =>(
                <div 
                key={volume.id} className="volume card"
                onClick={() => setPickVolume(volume)}>
                <h4>Volume {volume.volume_number}</h4>
                </div>
                
             ))}
             <hr/>
             {pickVolume && (
                <div>
                <Chapter chapter={pickVolume.chapter} volume={pickVolume} />
                </div>
            )}
            
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
                 />
             )))}
             <ChapterForm 
             manga_id={mangaData.id}/>
             <ReviewForm 
             manga_id={mangaData.id} />
        </div>
    ) 
}
export default MangaDetails