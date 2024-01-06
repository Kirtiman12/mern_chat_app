import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const history = useHistory();

  useEffect(
    (history) => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);

      if (!userInfo && history) {
        history.push("/");
      }
    },
    [history]
  );

  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
export const ChatState = () => {
  // JSON.stringify(localStorage.setItem("temporary", useContext(ChatContext)))
  return useContext(ChatContext);
};
