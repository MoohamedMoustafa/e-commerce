import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [userToken, setUserToken] = useState(null);
  // check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("UserToken");
    if(token) {
      setIsLogin(true);
      setUserToken(token);
    }
  }, []);
  return (
    <UserContext.Provider value={{ isLogin, setIsLogin, userToken,setUserToken }}>
        {props.children}
    </UserContext.Provider>
  );
}
