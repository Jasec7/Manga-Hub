import { Link } from "react-router-dom";

function MangaDetails({title, creator, release_year}){
    return(
        <div className="details">
            <br/>
            <h2>{title}</h2>
            <p>{creator}</p>
            <p>{release_year}</p>
        </div>
    )
};

export default MangaDetails