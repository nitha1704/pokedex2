import { Link, Switch, BrowserRouter, Route } from "react-router-dom";
// CSS
import "./css/style.css";

// Pages
import Home from "./pages/Home";
// Component
import PokemonInfo from "./components/PokemonInfo";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/pokemon/:id" component={PokemonInfo} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
