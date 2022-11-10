import { Link } from "react-router-dom";

const Menu = ()=>{
    return(
        <div>
           <li><Link to='/'>Home</Link></li> 
           <li><Link to='/login'>Login</Link></li> 
           <li><Link to='/main'>Main</Link></li> 
        </div>
    )
}

export default Menu;