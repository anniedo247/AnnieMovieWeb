import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
import NotFoundPage from "./pages/NotFoundPage";
import PublicNavBar from "./components/PublicNavBar";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={MovieList} />
          <Route 
          path="/movie/upcoming"
          render={(props)=> < MovieList{...props} type='upcoming'/>}
          />
          <Route 
          path="/movie/top_rated"
          render={(props)=> < MovieList{...props} type='top_rated'/>}
          />
          <Route path="/movie/:id" component={MovieDetail} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
