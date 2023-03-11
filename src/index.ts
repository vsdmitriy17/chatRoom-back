import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const PORT = 5000;
const app = express();
app.use(cors); // подключаем корсы

const serverHttp = http.createServer(app); // Сервер Прокси (HTTP сервер)

const serverSocket = new Server(serverHttp, { // Создаем сервер сокетов
  cors: { // добавляем корсы на сервер сокетов
    origin: "*", // хосты с кот разрешено подключение, "*" - с любых
      methods: ["GET","POST"], // методы запросов кот. разрешены
  }
});

serverSocket.on("connection", (serverIo) => { // вешаем слушателя события "connection" на сервер сокетов
  console.log("WebSocket connection started!");

  serverIo.on("disconnect", () => { // вешаем слушателя события "disconnect" на сервер сокетов
    console.log("WebSocket connection closed!");
  });
});

serverHttp.listen(PORT, () => {  // Запускаем Сервер Прокси (HTTP сервер) на порте 5000
  console.log(`Server is runing on port ${PORT}`);
});


