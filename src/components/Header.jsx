import { NavLink } from "react-router-dom"
import "../styles/style.css";
import profileImage from "../image/shoppingcart.ico";

const Header = ({user,setUser}) => {
  
    return (
        <nav className="header-container" style={{ position: 'absolute',  borderRight: '2px solid gray', left: 0, top: 0, width: '16%', height: '100%', backgroundColor: "#fff7e2ee" }}>
        
        <div style={{ position: "relative", padding: "40px", marginTop:'-150%', marginLeft: '3%' }}>
        <img
          src={profileImage}
          alt="Profile"
          style={{
            width: "60px", // Задайте нужную ширину
            height: "60px", // Задайте нужную высоту
            borderRadius: "50%", // Делаем круглое изображение
          }}
        /><div style={{ textAlign: "center" , marginLeft: '-40%'}}>
        <p style={{ margin: 0, fontSize: "16px", color: "#gray" }}>GroceryList</p>
         </div>
        </div>
        <ul style={{ listStyleType: 'none', padding: 0}}>
        <li style={{ position: 'relative', left: '10%', top: '10px' }}>
          <NavLink style={{ color: 'black', textDecoration: 'none' }} to={'/'}>
            
          </NavLink>
        </li>
        <li style={{ position: 'relative', left: '30%', top: '50px' }}>
          <NavLink style={{ color: 'black', textDecoration: 'none' }} to={'/list'}>
            Lists
          </NavLink>
        </li>
        <li style={{ position: 'relative', left: '30%', top: '700%' }}>
          
            {
              user ? <NavLink onClick={() => setUser(false)} style={{ color: 'gray', textDecoration: 'none'}}to="/login">
                    Exit
              </NavLink> : <NavLink style={{ color: 'black', textDecoration: 'none' }} to="/login">
                 Login
            </NavLink>
            }
          
          
        </li>
        <li style={{ position: 'relative', left: '40%', top: '25px'}}>
          <NavLink style={{ color: 'black', textDecoration: 'none' }} to={'/register'}>
            
          </NavLink>
        </li>
       
        </ul>
      </nav>
    );
  };

export default Header