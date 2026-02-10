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

  /*function handleChapterAdded(mangaId, newChapter) {
  setMangas((prevMangas) =>
    prevMangas.map((manga) =>
      manga.id === mangaId
        ? { ...manga, chapters: [...(manga.chapters || []), newChapter] }
        : manga
    )
  );
}*/
function handleChapterAdded(mangaId, newChapter) {
  setMangas((prevMangas) => {
    return prevMangas.map((manga) => {
      if (manga.id !== mangaId) {
        return manga;
      }

      const volumeId = Number(newChapter.volume_id);

      const updatedVolumes = manga.volumes.map((volume) => {
        if (volume.id !== volumeId) {
          return volume;
        }

        return {
          ...volume,
          chapters: [...volume.chapters, newChapter],
        };
      });

      return {
        ...manga,
        volumes: updatedVolumes,
      };
    });
  });
};
function handleChapterUpdated(mangaId, updatedChapter) {
  setMangas((prevMangas) =>
    prevMangas.map((manga) =>
      manga.id === mangaId
        ? {
            ...manga,
            chapters: (manga.chapters || []).map((ch) =>
              ch.id === updatedChapter.id ? updatedChapter : ch
            ),
          }
        : manga
    )
  );
}

function handleChapterDeleted(mangaId, chapterId) {
  setMangas((prevMangas) =>
    prevMangas.map((manga) =>
      manga.id === mangaId
        ? {
            ...manga,
            chapters: manga.chapters.filter((ch) => ch.id !== chapterId),
          }
        : manga
    )
  );
}

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
        volumes={volumes}
        onChapterAdded={handleChapterAdded}
        onChapterDeleted={handleChapterDeleted}
         onChapterUpdated={handleChapterUpdated}/>
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
