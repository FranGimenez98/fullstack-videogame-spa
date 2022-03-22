import {BrowserRouter, Switch, Route} from "react-router-dom";
import CardDetail from "./components/CardDetail/CardDetail";
import CreateCharacter from "./components/CreateCharacter/CreateCharacter";
import Home from "./components/Home/Home";
import LandingPage from './components/LandingPage/LandingPage';
import Topbar from './components/Topbar/Topbar'
import './index.module.css';

function App() {

  return (
    <BrowserRouter>
    <Topbar />
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={props => <Home {...props}/>} />
      <Route path='/videogames/:id' component={CardDetail} />
      <Route path="/videogame" component={CreateCharacter}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
