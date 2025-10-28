import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as API from "./api";

interface AuthProps{
    authState?:{token:string|null; authenticated:boolean | null};
    loading?:boolean ;
    user?: any;
    onRegister?: (email:string,password:string) => Promise<any>;
    onLogin?: (email:string,password:string) => Promise<any>;
    onLogout?: () => Promise<any>;
    onRefresh?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({});



export const AuthProvider = ({children}:any) =>{
    const [authState, setAuthState] = useState<{
        token:string|null;
        authenticated:boolean | null
    }>({
        token:null,
        authenticated:null
    });
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const u = await API.me();
        if (mounted) setUser(u);
      } catch (_) {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

    const login = async (creds) => {
    const u = await API.login(creds);
    setUser(u);
    return u;
  };

  const register = async (data) => {
    const u = await API.register(data);
    setUser(u);
    return u;
  };

  const logout = async () => {
    await API.logout();
    setUser(null);
  };

  const refresh = async () => {
    const tokens = await API.refreshTokens();
    return tokens;
  };

    const value = {
        onRegister: register,
        user,
        loading,
        onLogin: login,
        onLogout: logout,
        onRefresh: refresh,
        authState
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = () =>{
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};