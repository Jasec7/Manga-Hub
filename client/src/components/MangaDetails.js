import { Link } from "react-router-dom";
import React, {useState} from 'react';
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import ChapterForm from "./ChapterForm";
import Chapter from "./Chapter";

function MangaDetails({manga}){
    const [mangaData, setMangaData] = useState(manga)

    function handleReview(newReview){
        setMangaData({...mangaData,
            reviews:[...mangaData.reviews, newReview]
        });
    };
    function handleAddChapter(newChapter){
        setMangaData({...mangaData,
            chapters:[...mangaData.chapters, newChapter]
        });
    }
    return(
        <div className="details">
            <br/>
            <h2>{mangaData.title}</h2>
            <p>{mangaData.creator}</p>
            <p>{mangaData.release_year}</p>
            <p>Chapters</p>
            {mangaData.chapters.map((chapter) =>(
                <Chapter key={chapter.id}
                id={chapter.id}
                title={chapter.title}
                pages={chapter.pages}
                chapter_number={chapter.chapter_number}/>))}
            <p>Reviews: {mangaData.reviews.length}</p>
             {mangaData.reviews.map((review) =>(
                <Review key ={review.id}
                id={review.id}
                reviewer={review.reviewer}
                comment={review.comment}
                rating={review.rating} />
             ))}
             <ChapterForm onAddChapter={handleAddChapter}
              manga_id={mangaData.id}/>
             <ReviewForm onAddReview={handleReview}
              manga_id={mangaData.id} />
        </div>
    )
};

export default MangaDetails