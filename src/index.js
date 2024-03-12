import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Game from './page/game';
import Leaderboard from './page/leaderboard';
import {HashRouter,Route,Switch, Link} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

const Layout =(props) =>{
  return(
    <>
    <nav>
        <div style={{backgroundColor:"#282c34", display:"flex",justifyContent:"center",alignItems:"center"}}>
        <p style={{color:"white", display:"flex",justifyContent:"left"}}>
          Sandbox VR - Ng Siu Wa
        </p>
          <Link to="" style={{color:"white", marginLeft:"20px"}}>Home</Link>
          <Link to="/leaderboard" style={{color:"white", marginLeft:"20px"}}>Leaderboard</Link>
        </div>
    </nav> 
    { props.children }
    </>
  )
}

const Home = () =>{
  return( 
      <HashRouter>
        <Switch>
          <Layout>
            <Route exact={true} path="/" component={App}/>
            <Route path="/leaderboard" component={Leaderboard}/>
          </Layout>
        </Switch>
      </HashRouter>
  );
}


root.render(

    <Home/>
);

