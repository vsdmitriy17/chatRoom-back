import { Socket } from 'socket.io';
import { v4 as uuidV4 } from 'uuid';

const rooms: Record<string, string[]> = {}; // массив каналов (перенести в БД)

interface RoomParams { // тип для параметров joinRoom
  roomId: string,
  peerId: string,
}

export const roomHendler = (socketIo: Socket) => {
  const createRoom = () => {
    const roomId = uuidV4(); // Создаем уникальный айди канала
    rooms[roomId] = [];

    socketIo.emit("room-created", { roomId }); // Отправляем юзеру (клиенту) сообщение о создании канала и его айди
    console.log("User created the room");
  }

  const joinRoom = ({ roomId, peerId }: RoomParams) => {
    if (rooms[roomId]) {
      rooms[roomId].push(peerId);

      socketIo.join(roomId); // Присоединяемся к каналу
      socketIo.to(roomId).emit("user-joined", { peerId });
      socketIo.emit("get-users", { 
        roomId,
        participants: rooms[roomId],
      });
      console.log("User joined the room", roomId, peerId);
    }

    socketIo.on("disconnect", () => {
      console.log("User left the room", peerId);
      leaveRoom({ roomId, peerId });
    });
  }

  const leaveRoom = ({ roomId, peerId }: RoomParams) => {
    rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);
    socketIo.to(roomId).emit("user-disconnected", peerId)
  }

  socketIo.on("create-room", createRoom); // вешаем слушателя события "create-room" на сервер сокетов
  socketIo.on("join-room", joinRoom); // вешаем слушателя события "join-room" на сервер сокетов
}