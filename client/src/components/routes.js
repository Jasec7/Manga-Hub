import App from "./App";
import MangaPage from "./MangaPage";
import Home from "./Home";
import MangaDetails from "./MangaDetails";

const routes = [
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/mangas',
                element:<MangaPage/>
            },
            {
                path:'/mangas/:id',
                element:<MangaDetails/>
            }
        ]
    }
];

export default routes;