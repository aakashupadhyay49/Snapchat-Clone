import React,{useEffect} from 'react'
import "./Preview.css"
import {useSelector} from "react-redux"
import {selectCameraImage,resetCameraImage} from "./features/cameraSlice"
import { useNavigate } from "react-router-dom"
import CloseIcon from "@material-ui/icons/Close"
import  TextFieldsIcon from "@material-ui/icons/TextFields"
import CreateIcon from "@material-ui/icons/Create"
import NoteIcon from "@material-ui/icons/Note"
import MusicNoteIcon from "@material-ui/icons/MusicNote"
import AttachFileIcon from "@material-ui/icons/AttachFile"
import CropIcon from "@material-ui/icons/Crop"
import TimerIcon from "@material-ui/icons/Timer"
import SendIcon from "@material-ui/icons/Send"
import {useDispatch} from "react-redux"
import {v4 as uuid} from "uuid"
import {storage,db} from "./Firebase";
import {ref,uploadBytes,uploadString, uploadBytesResumable, getDownloadURL} from "@firebase/storage"
import firebase from "firebase/compat/app";
import { collection, addDoc } from "firebase/firestore";
import { selectuser } from './features/appSlice'
const Preview = () => {
    const navigate=useNavigate()
    const user=useSelector(selectuser)
    const cameraImage=useSelector(selectCameraImage)
    const dispatch=useDispatch()
    useEffect(()=>{
        if(!cameraImage){
            navigate("/")
        }
    },[cameraImage,navigate])

    const closePreview=()=>{
            dispatch(resetCameraImage())
    }

    // const sendPost=()=>{
    //     const id=uuid()
    //     const Storageref=ref(storage,`posts/${id}`)
    //     // const uploadTask= storage.ref(`posts/${id}`).putString(cameraImage,"data_url")
    //     // const uploadTask=uploadBytes(Storageref.putString(cameraImage,"data_url"))
    //   uploadString(Storageref, cameraImage, 'data_url').then((snapshot) => {
    //       getDownloadURL(snapshot.ref)
    //         // now let's do something after that upload
    //         .then((downloadURL) => {
    //           console.log('File available at', downloadURL);
    //           const docRef = addDoc(collection(db, "posts"), {
    //             image: downloadURL,
    //             username: "Kaitlin",
    //             read: false,
    //             // profilePic
    //             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                
  
    //           });
    //           navigate('/chats');
  
    //         });
    //     });

    
    // }



    const sendPost = () => {
        console.log("uhh")
        // this generates a random string that's unique
        const id = uuid();
    
        const metadata = {
          contentType: 'image/jpeg',
        };
    
        const storageRef = ref(storage, `posts/${id}`);
        const uploadTask = uploadBytesResumable(storageRef, cameraImage, metadata);
    
        // now we need to upload the image to firebase storage
        uploadString(storageRef, cameraImage, 'data_url')
          .then((snapshot) => {
            getDownloadURL(snapshot.ref)
              // now let's do something after that upload
              .then((downloadURL) => {
                console.log('File available at', downloadURL);
                const docRef = addDoc(collection(db, "posts"), {
                  image: downloadURL,
                  username: user.username,
                  read: false,
                  profilePic:user.profilePic,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp()
    
                });
                navigate('/chats');
    
              });
          });
      }
    


    return (
    <div className='preview'>
        <CloseIcon onClick={closePreview} className='preview__close'/>
        <div className='preview__toolbarRight'>
            <TextFieldsIcon/>
            <CreateIcon/>
            <NoteIcon/>
            <MusicNoteIcon/>
            <AttachFileIcon/>
            <CropIcon/>
            <TimerIcon/>
        </div>
        <img src={cameraImage} alt=""></img>
        <div onClick={sendPost} className='preview__footer'>
            <h2>Send Now</h2>
            <SendIcon fontSize='small' className='preview__sendIcon'/>
        </div>
    </div>
  )
}

export default Preview
