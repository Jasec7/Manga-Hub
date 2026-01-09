import React, {useEffect, useState} from "react";
import MangaList from "./MangaList";
import MangaForm from "./MangaForm";

function MangaPage(){
const [mangas, setMangas] = useState([])

useEffect(() =>{
    fetch("/mangas")
    .then(r => r.json())
    .then(mangas => setMangas(mangas))
},[])


function handleAddManga(newManga){
    setMangas([...mangas, newManga])
};

const handleDelete = (id) =>{
    fetch(`/mangas/${id}`,{
        method:"DELETE"
    })
    .then(() =>{
        const deleteManga = mangas.filter((manga) => manga.id !== id);
        setMangas(deleteManga)
    })
}

return(
    <div className="App">
    <MangaForm onAddMangas={handleAddManga}/>
    <MangaList mangas={mangas} onDelete={handleDelete}/>
    </div>
    )
}

export default MangaPage