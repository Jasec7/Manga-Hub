import { NavLink } from "react-router-dom";

function NavBar(){
    return(
        <nav>
            <NavLink
            exact to='/'
            className='nav-link'
            >
                Home
            </NavLink>

            <NavLink
            exact to='/mangas'
            className='nav-link'
            >
                Mangas
            </NavLink>
            <NavLink
            exact to='/volumes'
            className='nav-link'
            >
                Volumes
            </NavLink>
        </nav>
    )
};

export default NavBar;