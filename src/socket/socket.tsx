import { io } from 'socket.io-client';

interface Props {
    adultCount: number;
    childCount: number;
    store: string;
    userId: string;
    restaurantId: string;
}

export default function Socket({ adultCount, childCount, store, userId, restaurantId }: Props) {
  const onSocket = () => {
    const socket = io('http://localhost:3002', {
      transports: ['websocket']
    });

    // 데이터를 객체 형태로 전송
    socket.emit('postwaitingdata', { adultCount, childCount, store, userId, restaurantId });
    socket.on('getSever', (data) => console.log("받은 것",data)); // 서버 -> 클라이언트
  };
  onSocket();
};