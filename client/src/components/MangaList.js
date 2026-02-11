import React from "react";
import { Link } from "react-router-dom";


function MangaList({mangas, onDelete}){
    
    return(
        <div className="card">
          {mangas.map((manga) => (
            <div key={manga.id} className="card">
              <h3>{manga.title}</h3>
           
              <Link to={`/mangas/${manga.id}`}> View Volumes </Link>
              <button onClick={() => onDelete(manga.id)}>
                <strong>x</strong>
              </button>
            </div>
        ))}
        </div>
    );    
}

export default MangaList