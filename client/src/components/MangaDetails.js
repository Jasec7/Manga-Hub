
import { useParams } from "react-router-dom";
import React, {useState} from 'react';
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import ChapterForm from "./ChapterForm";
import Chapter from "./Chapter";

//import {useHistory} from "react-router-dom";
//import API_URL from "../api";

function MangaDetails({mangas, volumes, onChapterAdded, onChapterDeleted, onChapterUpdated}){
    const [isToggle, setIstoggle] = useState(false);
    const [pickVolume, setPickVolume] = useState(null)
    const {id} = useParams();
    const mangaId = Number(id);
    const mangaData = mangas.find((manga) => manga.id === mangaId);
    
    if(!mangaData) return null;


    const handleAddChapter = (newChapter) => {
        console.log("NEW CHAPTER:", newChapter);
        onChapterAdded(mangaData.id, newChapter)};

    const handleChapterDelete = (id) => {
        fetch(`/chapters/${id}`, { method: "DELETE" }).then((r) => {
            if (r.ok) {
                onChapterDeleted(mangaData.id, id);
                setPickVolume(null);
                
            }
        });
    }
    const handleUpdateChapter = (id, updatedFields) => {
        
        fetch(`/chapters/${id}`,{
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedFields),
        })
        .then((r) => r.json())
        .then((updatedChapter) => {
        onChapterUpdated(mangaData.id, updatedChapter);
        console.log(updatedChapter)
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
                onClick={() => setPickVolume(volume)}>
                    <h3>
                        Volume {volume.volume_number} {volume.edition}
                    </h3>

            {volume.chapters
                ?.filter((ch) => ch.manga_id === mangaData.id).map((chapter) => (
                <Chapter
                key={chapter.id}
                chapter={chapter}
                onDelete={handleChapterDelete}
                onUpdate={handleUpdateChapter}
                />
            ))}
               </div>
        ))}

            <p>Reviews: ({mangaData.reviews?.length || 0})</p>
            <button onClick={handleToggle}>
                {isToggle ? 'Hide review' : 'Show review'}
            </button>
             {isToggle &&(mangaData.reviews?.map((review) =>(
                <Review key ={review.id}
                id={review.id}
                reviewer={review.reviewer}
                comment={review.comment}
                rating={review.rating}
                 />
             )))}
             <ChapterForm 
             manga_id={mangaData.id}
             volumes={volumes}
             onAddChapter={handleAddChapter}/>
             <ReviewForm 
             manga_id={mangaData.id} />
        </div>
    ) 
}
export default MangaDetails