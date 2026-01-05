import { Link } from "react-router-dom";
import React, {useState} from 'react';
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import ChapterForm from "./ChapterForm";
import Chapter from "./Chapter";

function MangaDetails({manga}){
    const [mangaData, setMangaData] = useState(manga)
    console.log("Data:", mangaData)
    function handleReview(newReview){
        setMangaData({...mangaData,
            reviews:[...mangaData.reviews, newReview]
        });
    };
   function handleAddMChapter(newMChapter){
        setMangaData({...mangaData,
            manga_chapters:[...mangaData.manga_chapters, newMChapter]
        });
    }
    
    if(!mangaData.reviews || !mangaData.manga_chapters){
        return null;
    }

    return(  
        <div className="details">
            <br/>
            <h2>{mangaData.title}</h2>
            <p>{mangaData.creator}</p>
            <p>{mangaData.release_year}</p>

            <h2>Chapters</h2>
            {mangaData.manga_chapters.map((mangachapter) =>
                {if(!mangachapter || !mangachapter.chapter) return null; 
            return( 
                <Chapter key={mangachapter.id} 
                manga_chapter={mangachapter} />);
                })}
                
                
            <p>Reviews: ({mangaData.reviews.length})</p>
             {mangaData.reviews.map((review) =>(
                <Review key ={review.id}
                id={review.id}
                reviewer={review.reviewer}
                comment={review.comment}
                rating={review.rating} />
             ))}
             <ChapterForm onAddChapter={handleAddMChapter}
             manga_id={mangaData.id}/>
             <ReviewForm onAddReview={handleReview}
             manga_id={mangaData.id} />
        </div>
    )
};

export default MangaDetails