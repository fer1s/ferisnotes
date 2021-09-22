import './assets/css/App.css';

import Panel from './components/Panel';
import Home from './pages/Home';
import Note from './pages/Note';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Panel />
        <div className="content">
          <Route exact path="/" component={Home} />
          <Route path="/note/:id" component={Note}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
