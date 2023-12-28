import { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const history = useHistory()



    useEffect((history) =>{
       const userInfo = JSON.parse(localStorage.getItem('userInfo'));
       setUser(userInfo);
       

       if(!userInfo && history){
        history.push('/')
       }
    },[history])

    return (
        <ChatContext.Provider value={{ user, setUser}}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;
export const ChatState = ()=>{
    return useContext(ChatContext);
}
