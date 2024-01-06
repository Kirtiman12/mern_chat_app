import {Box, Button, Tooltip, Text, Menu, MenuButton, Avatar, MenuList, MenuItem, Drawer, DrawerContent, DrawerHeader, DrawerOverlay, DrawerBody, Input, useToast, Spinner } from "@chakra-ui/react";
import {BellIcon, ChevronDownIcon} from "@chakra-ui/icons";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/hooks";
import ChatLoading from "./ChatLoading"
import UserListItem from '../UserAvatar/UserListItem'
import axios from 'axios';


const SideDrawer = () => {
  const {user, setSelectedChat, chats, selectedChat, setChats} = ChatState()
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingChat, setloadingChat] = useState();
  const history = useHistory();
  const toast = useToast()
  const {isOpen, onOpen, onClose} = useDisclosure();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    if (history) {
      history.push("/");

    }
  };
  const handleSearch = async () => {
    if (!search) {
      toast({
        title : "Please Enter something in search",
        status : "warning",
        duration : 800,
        isClosable : true,
        position : "top-left"
      })
      return;
    }

    try {
      setloading(true);
      const config = { 
        headers : {
          Authorization :  `Bearer ${user.token}`
        }
      }
      const { data } = await axios.get(`/api/user?search=${search}`, config)
      setloading(false);
      setSearchResult(data);
    } catch(error) {
      toast({
        title : "Error Occured!",
        description : "Failed to Load the Search Results",
        status : "error",
        duration : 800,
        isClosable : true,
        position : "bottom-left"
      })
    }
  }
  const accessChat = async (userId) => {
    try {
      setloadingChat(true);
      const config = {
        headers : {
          "Content-type" : "application/json",
          Authorization : `Bearer ${user.token}`
        }
      }
      const { data } = await axios.post("/api/chat", {userId}, config)

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats])

      setSelectedChat(data);
      setloadingChat(false);
      onClose();
    } catch(error) {
      toast({
        title : "Error fetching the chat",
        description : error.message,
        status : "error",
        duration : 800,
        isClosable : true,
        position : "bottom-left"
      })
    }
  }
  return (
    <>
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="white"
      width="100%"
      padding="5px 10px"
      borderWidth="5px"
    >
      <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
        <Button onClick={onOpen} variant="ghost">
          <i className="fa-brands fa-searchengin"></i>
          <Text display={{ base: "none", md: "flex" }} paddingLeft={4}>
            Search User
          </Text>
        </Button>
      </Tooltip>

      <Text fontSize="2xl" fontFamily="Work Sans Pro" flex="1" textAlign="center">
        Chatter-Patter
      </Text>

      <Menu>
        <MenuButton padding={1}>
          <BellIcon fontSize="2xl" margin={1} />
        </MenuButton>
        {/* <MenuList></MenuList> */}
      </Menu>
      <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          <Avatar 
          size="sm"
          cursor="pointer"
          name={user.name}
          src={user.pic}/>
        </MenuButton>
        <MenuList>
          <ProfileModal user={user}>
            <MenuItem>My Profile</MenuItem>
            </ProfileModal>
            <MenuItem onClick={logoutHandler} >Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
    <Drawer
    placement="left"
    onClose={onClose}
    isOpen={isOpen}
    >
    <DrawerOverlay/>
    <DrawerContent>
      <DrawerHeader borderBottomWidth='1px'>Search Users  
      </DrawerHeader>
    <DrawerBody>
    <Box d='flex' pb={2}>
      <Input 
      placeHolder="Search by name or email"
      mr={2}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      />
      <Button
      onClick={handleSearch}
      >Go</Button>
    </Box>
    {loading ? (<ChatLoading />) : (
      searchResult?.map(user => (
        <UserListItem 
          key={user._id}
          user={user}
          handleFunction={() => accessChat(user._id)}
        />
      ))
    )}
    {loadingChat && <Spinner ml="auto" d="flex" />}
    </DrawerBody>
    </DrawerContent>
    </Drawer>
    </>
  );
};

export default SideDrawer;
