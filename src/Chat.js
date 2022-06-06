import React from 'react'
import { Avatar } from "@material-ui/core";
import StopRoundedIcon from "@material-ui/icons/StopRounded"
import "./Chat.css";
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import ReactTimeago from "react-timeago"
import {selectImage} from "./features/appSlice"
import { db } from './Firebase';

const Chat = ({id,username,timestamp,read,image,profilePic}) => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const open=()=>{
        if(!read){
            dispatch(selectImage(image))
            db.collection("posts").doc(id).set(
                {
                    read:true,
                },
                {
                    merge:true
                }
            );
            navigate("/chats/view")
        }
    }
    return (
    <div className='chat' onClick={open}>
        <Avatar src={profilePic}/>
        <div className='chat__info'>
            <h4>{username}</h4>
            <p>{!read && "Tap to view-"}{''}<ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()}/></p>
        </div>
        {!read && <StopRoundedIcon className="chat__readIcon"/>}
    </div>
  )
}

export default Chat