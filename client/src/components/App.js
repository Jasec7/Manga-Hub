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

 
function handleChapterAdded(mangaId, newChapter) {
  setMangas((prevMangas) => {
    return prevMangas.map((manga) => {
      if (manga.id !== mangaId) return manga;

      const volumeId = Number(newChapter.volume_id || newChapter.volume?.id);

      let volumeFound = false;

      const updatedVolumes = manga.volumes.map((volume) => {
        if (volume.id !== volumeId) return volume;

        volumeFound = true;

        return {
          ...volume,
          chapters: [...(volume.chapters || []), newChapter],
        };
      });

      if (!volumeFound) {
        const newVolume = {
          id: volumeId,
          volume_number: newChapter.volume?.volume_number || "New Volume",
          edition: newChapter.volume?.edition || "",
          chapters: [newChapter],
        };

        return {
          ...manga,
          volumes: [...updatedVolumes, newVolume],
        };
      }

      return {
        ...manga,
        volumes: updatedVolumes,
      };
    });
  });
}

function handleChapterUpdated(mangaId, updatedChapter) {
  setMangas((prevMangas) => {
    return prevMangas.map((manga) => {
      if (manga.id !== mangaId) {
        return manga;
      }

      const volumeId = Number(updatedChapter.volume_id);

      const updatedVolumes = manga.volumes.map((volume) => {
        if (volume.id !== volumeId) {
          return volume;
        }

        return {
          ...volume,
          chapters: volume.chapters.map((chapter) =>
            chapter.id === updatedChapter.id ? updatedChapter : chapter
          ),
        };
      });

      return {
        ...manga,
        volumes: updatedVolumes,
      };
    });
  });
}

function handleChapterDeleted(mangaId, chapterId) {
  setMangas((prevMangas) => {
    return prevMangas.map((manga) => {
      if (manga.id !== mangaId) return manga;

      const updatedVolumes = manga.volumes
        .map((volume) => ({
          ...volume,
          chapters: (volume.chapters || []).filter(
            (chapter) => chapter.id !== chapterId
          ),
        }))
        .filter((volume) => volume.chapters.length > 0);

      return {
        ...manga,
        volumes: updatedVolumes,
      };
    });
  });
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
