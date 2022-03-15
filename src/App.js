import './css/App.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      Beder Danskman
      <nav className='navBar'> 
        <Link to="/ansoka" >Ansöka</Link> | 
        <Link to="/kurser" >Kurser</Link> |
        <Link to="/personal" >Personal</Link> |
        <Link to="/utbildningar" >Utbildningar</Link> 
      </nav>
    </div>
  );
}

export default App;
