import './App.css';

import Profile from './pages/profilePage';
import Auth from './pages/authentication';
import Navbar from './components/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { useContext } from 'react';
import Footer from './components/footer';
import { userContext } from './context/userContext';
import ProfilePage from './pages/profilePage';
import PostContainer from './components/PostContainer';
import PostPage from './pages/postPage';





function App () {
  const {userLoggedObject,setUserLoggedObject} = useContext(userContext)



  return (
    <> 
     <Navbar />
    <Routes>
     
      
    
    <Route path='/blog' element= { <div className="App"> 
      <PostPage/> 
  
    </div>} />
      <Route path='/profile' element={<ProfilePage/>} />
      
     
    <Route path='/' element= {<Auth/>} />
    
    </Routes>
    <Footer />
    </>
   
  );
}

export default App;
