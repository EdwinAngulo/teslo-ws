import { connectToSocket } from "./socket-client";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>WebSocket - Client</h1>
    <input type="text" id="token" placeholder="Json Web Token" />
    <button id="connect">Connect</button>
    <br />
    <br />
    <strong>Server Status: </strong>
    <span id="server-status">Offline</span>
    <br />
    <h4>Clients</h4>
    <ul id="clients"></ul>
    <form id="message-form">
      <input type="text" id="message-input" />
    </form>


    <h3>Messages</h3>
    <ul id="messages"></ul>
  </div>
`;

//connectToSocket();

const connectButton = document.querySelector<HTMLButtonElement>("#connect");
const token = document.querySelector<HTMLInputElement>("#token");

connectButton!.addEventListener("click", () => {
  if (token!.value.trim().length < 1) {
    return alert("Please enter a token");
  }
  connectToSocket(token!.value);
});
