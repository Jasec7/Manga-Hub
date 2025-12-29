import React, {useEffect, useState} from "react";
import MangaList from "./MangaList"

function MangaPage(){
const [mangas, setMangas] = useState([])

useEffect(() =>{
    fetch("/mangas")
    .then(r => r.json())
    .then(data => {console.log("Fetched data", data);
    setMangas(data)})
},[])

return(
    <div className="App">
    <MangaList mangas={mangas} />
    </div>
    )
}

export default MangaPage