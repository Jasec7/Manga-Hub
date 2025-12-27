import React, {useEffect, useState} from "react";
import MangaList from "./MangaList"

function MangaPage(){
const [mangas, setMangas] = useState([])

useEffect(() =>{
    fetch("http://localhost:5555/mangas")
    .then(r => r.json())
    .then(mangas => setMangas(mangas))
},[])

return(
    <div className="App">
    <MangaList mangas={mangas} />
    </div>
    )
}

export default MangaPage