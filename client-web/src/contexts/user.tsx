import axios from "axios";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export interface User {
  email: string;
  password: string;
  isAdm: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const app = axios.create({
  baseURL: "https://blog-node-q3lk.onrender.com",
});

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error("useRequestContext must be used within a RequestProvider");
  }
  return user;
};

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
