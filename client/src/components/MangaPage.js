import React, {useEffect, useState} from "react";
import MangaList from "./MangaList";
import MangaForm from "./MangaForm";


function MangaPage(){
const [mangas, setMangas] = useState([]);
const [sortBy, setSortBy] = useState('a-z');
const API_URL = "https://manga-hub-555n.onrender.com";


useEffect(() =>{
    fetch(`${API_URL}/mangas`)
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
    }
        return 0;
})

return(
    <div className="App">
    <MangaForm onAddMangas={handleAddManga}/>
    <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="a-z">a-z</option>
        <option value="z-a">z-a</option>
    </select>

    <MangaList mangas={sortMangas}/>
    </div>
    )
}

export default MangaPage