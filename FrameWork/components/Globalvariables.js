import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [email, setEmail] = useState("John@gmail.com");
  const [userUID, setUserUID] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userInfo, setUserInfo] = useState("")
  const [docID, setDocID] = useState("");
  const [preloader, setPreloader] = useState(false);
  const [loginInPreloader, setLoginInPreloader] = useState(false);
  const [post, setPost] = useState("");
  const [allJobs, setAllJobs] = useState([]);


  return (
    <AppContext.Provider value={{ email, setEmail,
     preloader, setPreloader, userUID, setUserUID, loginInPreloader, setLoginInPreloader,
      userInfo, setUserInfo, allJobs, setAllJobs, post, setPost, docID, setDocID, firstName, setFirstName, lastName, setLastName}}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };