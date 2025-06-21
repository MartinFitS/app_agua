import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout as logoutService}  from "@/services/authService";

// Puedes tipar mejor el usuario si tienes un modelo, por ahora lo dejamos como `any`
type User = any;

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (userData: User, jwt: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Valor por defecto
export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

// Props esperadas por el provider
type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadFromStorage = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("token");
        const savedUser = await AsyncStorage.getItem("user");

        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error("Error loading auth data:", e);
      } finally {
        setLoading(false);
      }
    };

    loadFromStorage();
  }, []);

  const login = async (userData: User, jwt: string) => {
    setUser(userData);
    setToken(jwt);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    await AsyncStorage.setItem("token", jwt);
  };

  const logout = async () => {
    try {
      await logoutService(); // Llama al backend para poner en blacklist
    } catch (err) {
      console.error("Error during backend logout:", err);
    }

    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");

  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
