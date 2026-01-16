import { NavLink } from "react-router-dom";

function NavBar(){
    return(
        <nav>
            <NavLink
            to='/'
            className='nav-link'
            >
                Home
            </NavLink>

            <NavLink
            to='/mangas'
            className='nav-link'
            >
                Mangas
            </NavLink>
        </nav>
    )
};

export default NavBar;