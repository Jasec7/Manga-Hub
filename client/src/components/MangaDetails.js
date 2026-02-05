
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

    const handleAddChapter = (newVolume) => {
    setMangaData((prev) => ({
        ...prev,
        volumes: [...prev.volumes, newVolume],
  }));
};

    const handleChapterDelete = (id) =>{
    fetch(`/chapters/${id}`,{
        method:"DELETE"
    }).then((r) =>{
      if(r.ok){
        setMangaData((prev) => ({...prev,
             volumes: prev.volumes.filter((volume) => volume.chapter.id !== id),
         }))
         setPickVolume(null);
       }
    });
};

    const handleUpdateChapter = (id, updatedFields) =>{
        fetch(`/chapters/${id}`,{
          method:"PATCH",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify(updatedFields),
        })
        .then((r)=> r.json())
        .then((updatedChapter) => {
            setMangaData((prev) =>({
                ...prev,
                volumes: prev.volumes.map((volume) =>
                volume.chapter.id === id
                ? { ...volume, chapter: updatedChapter }
                : volume)
            }))
        })
    }
    
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
                <h4>Volume {volume.volume_number} {volume.edition}</h4>
                </div>
                
             ))}
             <hr/>
             {pickVolume?.chapter && (
                <div>
                <Chapter  
                volume={pickVolume}
                onDelete={handleChapterDelete}
                onUpdate={handleUpdateChapter}/>
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
             manga_id={mangaData.id}
             onAddChapter={handleAddChapter}/>
             <ReviewForm 
             manga_id={mangaData.id} />
        </div>
    ) 
}
export default MangaDetails