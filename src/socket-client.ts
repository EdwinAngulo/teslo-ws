import { Manager, Socket } from "socket.io-client";

let socket: Socket;
export const connectToSocket = (token: string) => {
  const manager = new Manager(
    "https://teslo-shop-nest-jr5s.onrender.com/socket.io/socket.io.js",
    {
      extraHeaders: {
        token: `${token}`,
      },
    }
  );
  socket?.removeAllListeners();
  socket = manager.socket("/");
  addListeners();
};

const addListeners = () => {
  const serverStatus =
    document.querySelector<HTMLSpanElement>("#server-status");
  const clientsList = document.querySelector<HTMLUListElement>("#clients");

  const messageForm = document.querySelector<HTMLFormElement>("#message-form");
  const messageInput =
    document.querySelector<HTMLInputElement>("#message-input");

  const messagesList = document.querySelector<HTMLUListElement>("#messages");

  socket.on("connect", () => {
    serverStatus!.innerText = "Online";
  });
  socket.on("disconnect", () => {
    serverStatus!.innerText = "Offline";
  });

  socket.on("clients-updated", (clients: string[]) => {
    clientsList!.innerHTML = "";
    clients.forEach((client) => {
      const li = document.createElement("li");
      li.innerText = client;
      clientsList!.appendChild(li);
    });
  });

  messageForm!.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput!.value;
    if (message.trim().length > 0) {
      socket.emit("message-from-client", { message });
      messageInput!.value = "";
    }
  });
  socket.on(
    "message-from-server",
    (data: { fullName: string; message: string }) => {
      const li = document.createElement("li");
      li.innerText = `${data.fullName}: ${data.message}`;
      messagesList!.appendChild(li);
    }
  );
};
