import React from "react";
import MangaDetails from "./MangaDetails"

function MangaList({mangas, onDelete}){
    
    return(
        <div className="card">
            {mangas.map((manga)=>(
                <MangaDetails key ={manga.id} manga={manga} onDelete={onDelete}/>
            ))}
        </div>
    )
}

export default MangaList