import { Socket } from 'socket.io';
import { v4 as uuidV4 } from 'uuid';

export const roomHendler = (socketIo: Socket) => {
  const createRoom = () => {
    const roomId = uuidV4(); // Создаем уникальный айди канала
    socketIo.emit("room-created", { roomId }); // Отправляем юзеру (клиенту) сообщение о создании канала и его айди
    console.log("User created the room");
  }
  const joinRoom = ({ roomId }: { roomId: string }) => {
    socketIo.join(roomId); // Присоединяемся к каналу
    console.log("User joined the room", roomId);
  }

  socketIo.on("create-room", createRoom); // вешаем слушателя события "create-room" на сервер сокетов
  socketIo.on("join-room", joinRoom); // вешаем слушателя события "join-room" на сервер сокетов
}