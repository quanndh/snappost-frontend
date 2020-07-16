import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';
import { backendHost } from '../../constants';
let io;
if (socketIOClient.sails) {
    io = socketIOClient;
} else {
    io = sailsIOClient(socketIOClient);
}

export default io;