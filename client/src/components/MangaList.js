import React from "react";
import { Link } from "react-router-dom";


function MangaList({mangas}){
    
    return(
        <div className="card">
            {mangas.map((manga)=>(
                <Link key={manga.id} to={`/mangas/${manga.id}`}>
                    <h3>{manga.title}</h3>
                </Link>
            ))}
        </div>
    )
}

export default MangaList