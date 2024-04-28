import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("Token"));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const AuthorizationToken = `Bearer ${token}`;

    const storeTokenData = (serverToken) => {
      setToken(serverToken);
      return localStorage.setItem("Token", serverToken);
    };

    const getuserData = async () => {
        try {
          const response = await fetch(
            "http://localhost:5050/Auth/admin/userData",
            {
              method: "GET",
              headers: {
                Authorization: AuthorizationToken,
              },
            })
    
            if (response.ok) {
              const data = await response.json();
              setUser(data.usersData);
              setIsLoading(false)
            }
            else
            {
              console.log("Error Fatching In Data");
              setIsLoading(false)
            }
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getuserData();
      }, []);

    return (
        <AuthContext.Provider value={{storeTokenData, user, AuthorizationToken, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

const AuthContextProvider = () => {
    return useContext(AuthContext)
}

export {AuthContext, AuthProvider, AuthContextProvider}