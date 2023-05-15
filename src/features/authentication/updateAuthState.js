import { decodeToken } from "react-jwt";
import { store } from "../../app/store";
import { setIsLoggedIn, setToken, setUserInfo } from "./authSlice";

//Login
export const updateAuthStoreStateLogin = (token) => {
   const myDecodedToken = decodeToken(token);

   // dispatch
   store.dispatch(setIsLoggedIn(true));
   store.dispatch(
      setUserInfo({
         id: myDecodedToken.userId,
         name: myDecodedToken.userName,
         role: myDecodedToken.userRole,
      })
   );
   store.dispatch(setToken(token));
};

//Logout
export const updateAuthStoreStateLogout = () => {
   // dispatch
   store.dispatch(setIsLoggedIn(false));
   store.dispatch(
      setUserInfo({
         id: "",
         name: "",
         role: "",
      })
   );
   store.dispatch(setToken(""));
};
