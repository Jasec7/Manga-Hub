import React from "react";
import MangaDetails from "./MangaDetails"

function MangaList({mangas}){
    console.log(mangas)
    return(
        <div className="card">
            {mangas.map((manga)=>(
                <MangaDetails key ={manga.id} manga={manga}/>
            ))}
        </div>
    )
}

export default MangaList