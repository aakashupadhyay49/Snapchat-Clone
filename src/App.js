import React,{useEffect} from 'react';
import WebcamCapture from './WebcamCapture';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ChatView from "./ChatView.js"
import Preview from './Preview';
import Chats from "./Chats";
import {useSelector,useDispatch} from "react-redux";
import {selectuser,login,logout} from "./features/appSlice"
import {auth} from "./Firebase";
import Login from "./Login";
import Signin from "./signin"

function App() {
  const user = useSelector(selectuser);
  // console.log(user)
  const dispatch=useDispatch()
  
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        console.log("yes auth")
        dispatch(login({
          username:authUser.displayName,
          profilePic:authUser.photoURL,
          id:authUser.uid,
        }))
      }else{
        dispatch(logout())
      }
    })
  },[])

  return (
    <div className="app">
      <BrowserRouter>
        {!user ? (
             <Signin/>
        ):(
          <>
          <img className='app__logo' src='https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg' alt="" />

          <div className='app__body'>
            <div className='app__bodyBackground'>
              <Routes>
                <Route path="/chats/view" element={<ChatView/>}/>

                <Route path="/preview" element={<Preview/>}/>
                <Route path="/chats" element={<Chats/>}/>
                {/* <Route path="/test">{<h1>Hey buddy</h1>}</Route> */}
                  <Route path="/" element={<WebcamCapture/>}/>
              </Routes>
            </div>
          </div>   
          </> 
        )}
          
      </BrowserRouter>
      
    </div>
  );
}

export default App;
