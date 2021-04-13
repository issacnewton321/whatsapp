import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined, Mic } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import db from '../firebase'
import './Chat.css'
import firebase from 'firebase'
import useSound from 'use-sound'
import ting from './ting.mp3'
function  Chat(props) {
    const sendMessage=(e)=>{
        e.preventDefault()
        db.collection('rooms').doc(roomID).collection('messages').add({
            message:input,
            name:user.name,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('')
    }
    const [roomID,setRoomID] = useState(null)
    useEffect(()=>{
        setRoomID(props.roomID)
    },[props])
    const [play] = useSound(ting)
    const[messages,setMessages] = useState([]);
    const [input,setInput] = useState('')
    const [roomName,setRoomName]= useState('')
    useEffect(()=>{
        if(roomID){
            db.collection('rooms').doc(roomID).
            onSnapshot(snapshot => setRoomName(snapshot.data().name))

            db.collection('rooms').doc(roomID).
            collection('messages').orderBy('timestamp','asc')
            .onSnapshot(snapshot=>
                setMessages(snapshot.docs.map(doc => ({id:doc.id,message:doc.data()})))
            )
            
        }
        
    },[roomID])
    useEffect(()=>{
        const m = messages[messages.length - 1]
        
        if(m){
            if(m.message.name != user.name)
            play()
        }

    },[messages])
    const [user,setUser] = useState({
        name:'',
        photo:null
    })
    useEffect(()=>{
        setUser(props.user)
    },[props])
    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={user.photo?user.photo:null}/>
                <div className='chat__headerInfo'>
                    <h3>{roomName}</h3>
                    <p>Last seen at</p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className='chat__body'>
                {messages.map(({id,message}) => 
                    <p className={`chat__message ${message.name === user.name?'chat__reciever':''}`} key={id}>
                        <span className="chat__name">
                            {message.name}
                        </span>
                        {message.message}
                        <p className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </p>
                    </p>
                )}
                
            </div>
            <div className='chat__footer'>
                <InsertEmoticon />
                <form>
                    <input 
                        placeholder='Enter your message'
                        value={input}
                        onChange={(e)=>setInput(e.target.value)} 
                    />
                    <button onClick={sendMessage}>Send a message</button>
                </form>
                <Mic />
            </div>
        </div>
    )
}
export default Chat