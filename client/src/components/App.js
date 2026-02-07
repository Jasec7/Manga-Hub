import { Switch, Route } from "react-router-dom";
import React, {useEffect, useState} from "react";
import MangaPage from "./MangaPage";
import MangaDetails from "./MangaDetails";
import Home from "./Home";
import NavBar from "./NavBar";

function App() {

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
  
   const handleMangaDelete = (id) =>{
      fetch(`/mangas/${id}`,{
          method:"DELETE"
      }).then((r) =>{
        if(r.ok){
          setMangas((mangas) =>
          mangas.filter((manga) => manga.id !== id));
        }
      });
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
    <div>
    <NavBar/>
    <Switch>
      <Route exact path='/'>
        <Home/>
      </Route>

      <Route exact path='/mangas'>
        <MangaPage onAddMangas={handleAddManga}
        mangas={sortMangas} 
        onDelete={handleMangaDelete}/>
      </Route>

      <Route path='/mangas/:id'>
        <MangaDetails mangas={mangas}/>
      </Route>
    </Switch>
    </div>
  );
}

export default App;
