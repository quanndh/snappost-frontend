import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';
import { backendHost } from '../../constants';

let io;
if (socketIOClient.sails) {
    io = socketIOClient;
    io.sails.url = backendHost;
} else {
    io = sailsIOClient(socketIOClient);
    io.sails.url = backendHost;
}

export default io;