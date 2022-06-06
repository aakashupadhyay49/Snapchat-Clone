import React,{useEffect} from 'react'
import "./ChatView.css"
import { useNavigate } from "react-router-dom"
import {useSelector} from "react-redux"
import {selectSelectedImage} from "./features/appSlice"
import {CountdownCircleTimer} from "react-countdown-circle-timer"
const ChatView = () => {
    const selectedImage=useSelector(selectSelectedImage)
    const navigate=useNavigate()
    useEffect(()=>{
        if(!selectedImage){
            exit()
        }
    },[selectedImage])
    const exit=()=>{
            navigate("/chats")
    }
  return (
    <div className='chatView'>
        <img src={selectedImage} onClick={exit} alt=""></img>
        <div className='chatView__timer'>
            <CountdownCircleTimer 
                isPlaying
                duration={10}
                strokeWidth={6}
                size={50}    //50mm
                colors={[
                    ["#004777",0.33],
                    ["#F7BB01",0.33],
                    ["#A30000",0.33],
                ]}
            >
                {({remainingTime})=>{
                    if(remainingTime===0){
                        exit()
                    }
                    return remainingTime
                }}
            </CountdownCircleTimer>
        </div>

    </div>
  )
}

export default ChatView