import { createContext } from "react";
import { User } from "../interfaces/User";

export const UserContext = createContext<User | null>(null);
