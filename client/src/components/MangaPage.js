import React, {useEffect, useState} from "react";
import MangaList from "./MangaList";
import MangaForm from "./MangaForm";


function MangaPage(){
const [mangas, setMangas] = useState([]);
const [sortBy, setSortBy] = useState('a-z');

useEffect(() =>{
    fetch("/mangas")
    .then(r => r.json())
    .then(mangas => setMangas(mangas))
},[])

function handleAddManga(newManga){
    setMangas([...mangas, newManga])
};

const sortMangas = [...mangas].sort((a,b) =>{
    if(sortBy === 'a-z'){
        return a.title.localeCompare(b.title);
    } else if(sortBy === 'z-a'){
        return b.title.localeCompare(a.title)
    } else {
        return 0;
    }
})

return(
    <div className="App">
    <MangaForm onAddMangas={handleAddManga}/>
    <Select onChange={(e) => setSortBy(e.target.value)}/>
    <MangaList mangas={sortMangas}/>
    </div>
    )
}

export default MangaPage