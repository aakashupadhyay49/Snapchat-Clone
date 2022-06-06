import React,{useState,useEffect} from 'react'
import "./Chats.css"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search"
import ChatBubbleIcon from "@material-ui/icons/ChatBubble"
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {db} from "./Firebase"
import Chat from "./Chat";
import {useSelector} from "react-redux"
import {selectuser} from "./features/appSlice"
import {auth} from "./Firebase";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked"
import { resetCameraImage } from './features/cameraSlice';
const Chats = () => {
  const [posts,setPosts] =useState([])
  const user=useSelector(selectuser)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  useEffect(()=>{
      db.collection("posts")
        .orderBy("timestamp","desc")
        .onSnapshot((snapshot)=>
          setPosts(
            snapshot.docs.map((doc)=>({
              id:doc.id,
              data:doc.data(),
            }))
          )
        )
  })

  const takeSnap=()=>{
    dispatch(resetCameraImage())
      navigate("/")
  }
  return (
    <div className='chats'>
      <div className='chats__header'>
        <Avatar className='chats__avatar' src={user.profilePic} onClick={()=>auth.signOut()}/>
        <div className='chats__search'>
          <SearchIcon />
          <input placeholder="Friends" type="text" className='chats__searchIcon'/>
        </div>
        <ChatBubbleIcon className="chats__chatIcon"/>
      </div>

      <div className="chat__posts">
           {posts.map(
             ({
               id,data:{profilePic,username,timestamp,image,read},
             })=>(
               <Chat
                key={id}
                id={id}
                username={username}
                timestamp={timestamp}
                image={image}
                read={read}
                profilePic={profilePic}
               />
             )
           )}
      </div>
      <RadioButtonUncheckedIcon
          className="chats__takePicIcon"
          onClick={takeSnap}
          fontSize='large'
      
      />
    </div>
  )
}

export default Chats