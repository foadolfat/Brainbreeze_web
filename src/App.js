import * as React from 'react';
import 'react-spring-modal/styles.css';
import './App.css';
import Navbar from './Components/Navbar/Navbar.jsx';
import Landing from './Pages/Landing.jsx';
import Classes from './Pages/Classes.jsx';
import Lessons from './Pages/Lessons.jsx';
import Modules from './Pages/Modules.jsx';
import Profile from './Pages/Profile.jsx';
import Units from './Pages/Units.jsx';
import Content from './Pages/Content.jsx';
import Search from './Pages/Search.jsx'
import Admincard from './Components/Admincard/Admincard.jsx';
import {Nav} from './Contexts/NavContext';


function App() {
  const {states:NavState} = React.useContext(Nav);
  return (
    <div className="App">
      <Navbar />
      {NavState.nav === 'landing' && <Landing />}
      {NavState.nav === 'profile' && <Profile />}
      {NavState.nav === 'search' && <Search />}
      {NavState.nav === 'admin' && <Admincard />}
      <div>
        {
          NavState.nav === 'classes' &&
          <div className="rows">
            <div className="ct">
              <Classes/>
            </div>
            <div className="item">
              <Content />
            </div>
          </div>
        }
      </div>
      <div>
        {
          NavState.nav === 'modules' &&
          <div className="rows">
            <div className="ct">
              <Classes/>
            </div>
            <div className="ct">
              <Modules />
            </div>
            <div className="item">
              <Content />
            </div>
          </div>
        }
      </div>
      <div>
        {
          NavState.nav === 'lessons' &&
          <div className="rows">
            <div className="ct">
              <Classes/>
            </div>
            <div className="ct">
              <Modules />
            </div>
            <div className="ct">
              <Lessons />
            </div>
            <div className="item">
              <Content />
            </div>
          </div>
        }
      </div>
      <div>
        {
         NavState.nav === 'content' &&
          <div className="rows">
            <div className="ct">
              <Classes/>
              </div>
            <div className="ct">
              <Modules />
            </div>
            <div className="ct">
              <Lessons />
            </div>
            <div className="ct">
              <Units />
            </div>
            <div className="item">
              <Content />
            </div>
          </div>
        }
      </div>
      <div>
        {
          NavState.nav === 'units' &&
          <div className="rows">
            <div className="ct">
              <Classes/>
              </div>
            <div className="ct">
              <Modules />
            </div>
            <div className="ct">
              <Lessons />
            </div>
            <div className="ct">
              <Units />
            </div>
            <div className="item">
              <Content />
            </div>
          </div>
        }
      </div>
      {/* { 
      NavState.nav !== 'profile' && NavState.nav !== 'landing' && 
        <div className="rows">
          <div className="ct">
            <Classes/>
            </div>
          <div className="ct">
            <Modules />
          </div>
          <div className="ct">
            <Lessons />
          </div>
          <div className="ct">
            <Units />
          </div>
          <div className="item">
            <Content />
          </div>
        </div>
      } */}
    </div>
  );
}

export default App;
