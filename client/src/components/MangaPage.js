import React, {useEffect, useState} from "react";
import MangaList from "./MangaList";
import MangaForm from "./MangaForm";


function MangaPage(){
const [mangas, setMangas] = useState([]);


useEffect(() =>{
    fetch("/mangas")
    .then(r => r.json())
    .then(mangas => setMangas(mangas))
},[])


function handleAddManga(newManga){
    setMangas([...mangas, newManga])
};


return(
    <div className="App">
    <MangaForm onAddMangas={handleAddManga}/>
    <MangaList mangas={mangas}/>
    </div>
    )
}

export default MangaPage