import './App.css';
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import {BrowserRouter as Router,Switch,Route, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/Login';
function App() {
  const[user,setUser] = useState(null);
  useEffect(()=>{
    let { roomID } = useParams();
  },[])
  useEffect(()=>{
    alert('fdfd')
  },[roomID])
  return (
    
    <div className="App">
      {!user?(
        <Login getLogin={(u)=>setUser({photo:u.photoURL,name:u.displayName})}/>
      ):(
        <div className='app__body'>
          <Router>
              
              
              <Switch>
              <Sidebar />
              
                <Route path="/rooms/:roomID">
                  <Chat user = {user} roomID={roomID}/>
                </Route>
              </Switch>
            
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
