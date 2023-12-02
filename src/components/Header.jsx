import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <nav>
          <ul style={{ display: "flex" , gap: "30px", textDecoration: "none"}}>
            <NavLink style={{ color: "black", textDecoration: "none"}} to={"/"}>
                  Home 
            </NavLink>
            <NavLink style={{ color: "black", textDecoration: "none"}} to={"/login"}>
                Login
            </NavLink>
            <NavLink style={{ color: "black", textDecoration: "none"}} to={"/register"}>
                Register
            </NavLink>
            <NavLink style={{ color: "black", textDecoration: "none"}} to={"/list"}>
                List
            </NavLink>
          </ul>
        </nav>
    )
}

export default Header