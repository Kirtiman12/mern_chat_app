import { Box, Button, Tooltip, Text, Menu, MenuButton, Avatar, MenuList, MenuItem } from "@chakra-ui/react";
import {BellIcon, ChevronDownIcon} from "@chakra-ui/icons";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";


const SideDrawer = () => {
  const {user} = ChatState()
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingChat, setloadingChat] = useState();

  
  return (
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
            <MenuItem>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default SideDrawer;
