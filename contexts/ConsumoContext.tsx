import React, { createContext, useState, useEffect, ReactNode } from "react";
import io from "socket.io-client";

type ConsumoContextType = {
  consumoDelDia: number;
  horaActualizacion: string;
};

export const ConsumoContext = createContext<ConsumoContextType>({
  consumoDelDia: 0,
  horaActualizacion: "",
});

export const ConsumoProvider = ({ children }: { children: ReactNode }) => {
  const [consumoDelDia, setConsumoDelDia] = useState(0);
  const [horaActualizacion, setHoraActualizacion] = useState("");

  useEffect(() => {
    const socket = io("https://api-tesis-7k22.onrender.com", {
      transports: ["websocket"],
      path: "/socket.io",
    });

    socket.on("connect", () => {
      console.log("🔌 WebSocket conectado desde contexto global");
    });

    socket.on("datos", (data) => {
      const partes = data.timestamp.split(", ");
      const horaFormateada = partes[1] || "Hora inválida";
      setConsumoDelDia(data.lectura);
      setHoraActualizacion(horaFormateada);
    });

    return () => {
      socket.disconnect();
      console.log("❌ WebSocket desconectado desde contexto global");
    };
  }, []);

  return (
    <ConsumoContext.Provider value={{ consumoDelDia, horaActualizacion }}>
      {children}
    </ConsumoContext.Provider>
  );
};
