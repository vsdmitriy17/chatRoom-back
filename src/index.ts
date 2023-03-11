import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const PORT = 5000;
const app = express();
const serverHttp = http.createServer(app); // Сервер Прокси (HTTP сервер)
const serverSocket = new Server(serverHttp); //Создаем сервер сокетов

serverSocket.on("connection", () => { // вешаем слушателя события "connection" на сервер сокетов
    console.log("WebSocket connection success!");
});

serverHttp.listen(PORT, () => {  // Запускаем Сервер Прокси (HTTP сервер) на порте 5000
    console.log(`Server is runing on port ${PORT}`);
});


