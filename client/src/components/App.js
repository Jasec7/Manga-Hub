import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import MangaPage from "./MangaPage";
import MangaDetails from "./MangaDetails";
import Home from "./Home";
import NavBar from "./NavBar";

function App() {
  return(
    <div>
    <NavBar/>
    <Switch>
      <Route exact path='/'>
        <Home/>
      </Route>

      <Route exact path='/mangas'>
        <MangaPage/>
      </Route>

      <Route path='/mangas/:id'>
        <MangaDetails/>
      </Route>
    </Switch>
    </div>
  );
}

export default App;
