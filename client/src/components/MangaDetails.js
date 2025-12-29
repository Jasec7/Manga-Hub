import { Link } from "react-router-dom";

function MangaDetails({manga}){
    return(
        <div className="details">
            <br/>
            <h2>{manga.title}</h2>
            <p>{manga.creator}</p>
            <p>{manga.release_year}</p>
            <p>Reviews: {manga.reviews.length}</p>
        </div>
    )
};

export default MangaDetails