import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import MangaPage from "./MangaPage";
import {Outlet} from 'react-router-dom';

function App() {
  return(
    <div>
    <MangaPage/>
    <Outlet/>
    </div>
  )
}

export default App;
