import React, {useState} from 'react'
import { ChatState } from '../../Context/ChatProvider';
import { useToast } from '@chakra-ui/react';

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats} = ChatState();
  const toast = useToast();
  return (
    <div>MyChats</div>
  )
}

export default MyChats