import {Box, Button, Tooltip, Text, Menu, MenuButton, Avatar, MenuList, MenuItem, Drawer, DrawerContent, DrawerHeader, DrawerOverlay, DrawerBody, Input } from "@chakra-ui/react";
import {BellIcon, ChevronDownIcon} from "@chakra-ui/icons";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/hooks";


const SideDrawer = () => {
  const {user} = ChatState()
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingChat, setloadingChat] = useState();
  const history = useHistory();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    if (history) {
      history.push("/");

    }
  };
  
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
        <Button variant="ghost">
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
    onOpen={isOpen}
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
      //onClick={handleSearch}
      >Go</Button>
    </Box>
    </DrawerBody>
    </DrawerContent>
    </Drawer>
    </>
  );
};

export default SideDrawer;
