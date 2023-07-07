import { createContext, useContext, useState, useEffect } from "react";
import { UserProviderProps } from '../Utils/Types';


export type ReplyContextType = {
    showAddReply: boolean,
    setShowAddReply: React.Dispatch<React.SetStateAction<boolean>>
  };
  
// create a context for the theme (light or dark)
export const ShowAddReplyContext = createContext<ReplyContextType>({
// theme default from window match media (dark mode if user preference is dark) or local storage
showAddReply: false,
setShowAddReply: () => {},

});


export const useShowAddReply = () => useContext(ShowAddReplyContext);

export const ReplyProvider: React.FC<UserProviderProps> = ({
    children
  }) =>{
    // get theme from local storage and set the state to it
    const [showAddReply, setShowAddReply] = useState<boolean>(false);

    useEffect(() => {
        if (showAddReply) {
          console.log("showAddReply is true");
        }

    }, [showAddReply,setShowAddReply]);

  
    return (
      <ShowAddReplyContext.Provider value={{ showAddReply, setShowAddReply }}>
        {children}
      </ShowAddReplyContext.Provider>
    );
  }