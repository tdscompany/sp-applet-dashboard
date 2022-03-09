import {
  useContext
} from "react";
import {
  AuthContext
} from "../providers/auth";
import {
  useHistory
} from "react-router";
import "./styles.scss";


const Wellcome = ({
  username
}) => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    auth.setApiToken("");
    auth.setIsAuthenticated(!auth.isAuthenticated);
    history.push("/login");
  };

  return ( 
    <div className = "container">
      <img src = "group96.svg" />
      <div className = "welcome" >
        <h3 > Olá, {username} !</h3> 
        <p> Aqui você encontra os dados das suas jornadas em um só lugar </p> 
      </div >

    </div>
  );
};

export default Wellcome;