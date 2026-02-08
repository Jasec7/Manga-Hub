
import { useParams } from "react-router-dom";
import React, { useEffect, useState} from 'react';
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import ChapterForm from "./ChapterForm";
import Chapter from "./Chapter";

//import {useHistory} from "react-router-dom";
//import API_URL from "../api";

function MangaDetails({mangas}){
    const [mangaData, setMangaData] = useState(null);
    const [isToggle, setIstoggle] = useState(false);
    const [pickVolume, setPickVolume] = useState(null)
    const {id} = useParams();
    
    useEffect(() => {
    const mangaId = parseInt(id, 10);
    const findManga = mangas.find((manga) => manga.id === mangaId)

    if (findManga){
        setMangaData(findManga);
        setPickVolume(null);
    }
}, [mangas, id])

    if(!mangaData || !mangaData.volumes){
        return null;
    };
    
    console.log(mangaData)

    const handleAddChapter = (newChapter) => {
    setMangaData((prev) => ({
        ...prev,
        chapters: [...prev.chapters, newChapter],
  }));
};

    const handleChapterDelete = (id) =>{
    fetch(`/chapters/${id}`,{
        method:"DELETE"
    }).then((r) =>{
      if(r.ok){
        setMangaData((prev) => ({...prev,
             chapters: prev.chapters.filter((chapter) => chapter.id !== id),
         }))
         setPickVolume(null);
       }
    });
};

    const handleUpdateChapter = (id, updatedFields) => {
        fetch(`/chapters/${id}`, {
         method: "PATCH",
         headers:{
            "Content-Type": "application/json"
         },
         body: JSON.stringify(updatedFields),
       })
        .then((r) => r.json())
        .then((updatedChapter) => {
            setMangaData((prev) => ({
                ...prev,
                chapters: prev.chapters.map((ch) =>
                    ch.id === id ? updatedChapter : ch
            ),
        }));
    });
};
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
            {mangaData.volumes?.map((volume) => (
                <div className="volume card"
                key={volume.id}
                onClick={() => setPickVolume(volume)}
                style={{ cursor: "pointer" }}>
                    <h4>
                        Volume {volume.volume_number} {volume.edition}
                    </h4>
                 </div>
            ))}
            {mangaData.chapters?.filter((chapter) => chapter.volume.id === pickVolume?.id).map((chapter)=>(
            <Chapter
              key={chapter.id}
              chapter={chapter}
              onDelete={handleChapterDelete}
              onUpdate={handleUpdateChapter}
             />
            ))}
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
             volumes={mangaData.volumes}
             onAddChapter={handleAddChapter}/>
             <ReviewForm 
             manga_id={mangaData.id} />
        </div>
    ) 
}
export default MangaDetails