import { Switch, Route } from "react-router-dom";
import React, {useEffect, useState} from "react";
import MangaPage from "./MangaPage";
import MangaDetails from "./MangaDetails";
import VolumePage from "./VolumePage";
import Home from "./Home";
import NavBar from "./NavBar";

function App() {
  const [mangas, setMangas] = useState([]);
  const [volumes, setVolumes] = useState([]);
  
  
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

  useEffect(() => {
    fetch("/volumes")
    .then((r) => r.json())
    .then(volumes => setVolumes(volumes))
  },[])

  function handleAddVolume(newVolume){
    setVolumes([...volumes, newVolume])
  };

  return(
    <div>
    <NavBar/>
    <Switch>
      <Route exact path='/'>
        <Home/>
      </Route>

      <Route exact path='/mangas'>
        <MangaPage onAddMangas={handleAddManga}
        mangas={mangas} 
        onDelete={handleMangaDelete}/>
      </Route>

      <Route path='/mangas/:id'>
        <MangaDetails mangas={mangas}
        volumes={volumes}/>
      </Route>
      <Route path='/volumes'>
        <VolumePage volumes={volumes}
        onAddVolumes={handleAddVolume}/>
      </Route>
    </Switch>
    </div>
  );
}

export default App;
