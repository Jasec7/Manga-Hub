import React, {useState} from "react";
import MangaList from "./MangaList";
import MangaForm from "./MangaForm";
//import API_URL from "../api";


function MangaPage({mangas, onAddMangas, onDelete}){
const [sortBy, setSortBy] = useState('a-z');


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
    <MangaForm onAddMangas={onAddMangas}/>
    <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="a-z">a-z</option>
        <option value="z-a">z-a</option>
    </select>
    <MangaList mangas={sortMangas} onDelete={onDelete}/>
    </div>
    )
}

export default MangaPage