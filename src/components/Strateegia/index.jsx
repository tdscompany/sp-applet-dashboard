import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/auth";
import { fetchUserData, fetchUserProjects, fetchMapStatisticsHome } from "../../services/requestFunctions";
import Wellcome from "../Wellcome";
import Navbar2 from "../Navbarv2";
import JourneyPagesList from './JourneyPagesList';

import "./styles.scss";
import JourneysCards from "./JourneysCards";
import ComparisonSelector from "./ComparisonSelector";

const Strateegia = () => {
  const [user, setUser] = useState({});
  const [projectsData, setProjectsData] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetchUserData(auth.apiToken).then((response) => {
      console.log(response)
      localStorage.setItem("userId", response.id);
      setUser(response);

      fetchUserProjects(auth.apiToken ).then((data) => {
        const journeys = data.map(dt => (
          dt.projects
        ))
        setProjectsData(...[journeys.flat()])
       }) 
    });
  }, [auth.apiToken]);

  return (
    
    <div className="Wrapper">
      <div className="WrapperNav">
          <Navbar2 />
          <Wellcome username={user.name}/>
      </div>
      <JourneysCards />
      <div className="container2">
        <JourneyPagesList projects={projectsData}/>
        <ComparisonSelector projects={projectsData}/>
      </div>
    </div>
  );
};

export default Strateegia;
