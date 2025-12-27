import React from "react";
import MangaDetails from "./MangaDetails"

function MangaList({mangas}){
    return(
        <div className="card">
            {mangas.map((manga)=>(
                <MangaDetails key={manga.id}
                id={manga.id}
                title={manga.title}
                creator={manga.creator}
                release_year={manga.release_year}/>
            ))}
        </div>
    )
}

export default MangaList