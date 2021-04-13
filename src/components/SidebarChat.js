import { Avatar } from '@material-ui/core';
import { useEffect } from 'react';
import './SidebarChat.css';
import db from '../firebase'
import {Link} from 'react-router-dom'

function SidebarChat({addNewChat,id,name}){
    useEffect(()=>{

    },[])
    const createChat = ()=>{
        const roomName = prompt('Enter the name of the room chat')
        if(roomName){
            // do on db
            db.collection('rooms').add({
                name:roomName
            })
        }
    }
    return !addNewChat ? (
        <Link to={`/rooms/${id}`} className='linkk'>
            <div className='sidebarChat'>
                <Avatar  src="https://img.icons8.com/office/40/000000/room.png"/>
                <div className='sidebarChat__info'>
                    <h2>{name}</h2>
                    <p>Last message ...</p>
                </div>
            </div>
        </Link>
    ):(
        <div onClick={createChat}
            className='sidebarChat'>
                <h2>Add new chat</h2>
            </div>
    )
}
export default SidebarChat