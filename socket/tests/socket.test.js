// Run: npx jest --detectOpenHandles --forceExit


const io = require('socket.io-client');
const http = require('http');
const { Server } = require('socket.io');

describe('Socket.IO Server', () => {
  let server;
  let ioServer;
  let clientSocket;
  let clientSocket2;
  const users = new Map();
  const messages = {};

  beforeAll((done) => {
    server = http.createServer();
    ioServer = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    ioServer.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('addUser', (userId) => {
        console.log('User added:', userId);
        users.set(userId, socket.id);
        ioServer.emit('getUsers', Array.from(users.keys()));
      });

      socket.on('sendMessage', ({ senderId, receiverId, text, images }) => {
        console.log('Message sent:', { senderId, receiverId, text });
        const message = {
          senderId,
          receiverId,
          text,
          images: images || [],
          createdAt: new Date()
        };

        messages[receiverId] = messages[receiverId] || [];
        messages[receiverId].push(message);

        const receiverSocketId = users.get(receiverId);
        if (receiverSocketId) {
          ioServer.to(receiverSocketId).emit('receiveMessage', message);
        }
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        const disconnectedUsers = [];
        users.forEach((value, key) => {
          if (value === socket.id) {
            disconnectedUsers.push(key);
            users.delete(key);
          }
        });
        if (disconnectedUsers.length) {
          ioServer.emit('getUsers', Array.from(users.keys()));
        }
      });
    });

    server.listen(() => {
      const port = server.address().port;
      console.log(`Server is listening on port ${port}`);
      clientSocket = io(`http://localhost:${port}`, { reconnection: false });
      clientSocket2 = io(`http://localhost:${port}`, { reconnection: false });

      let connectCount = 0;
      const onConnect = () => {
        connectCount += 1;
        if (connectCount === 2) {
          console.log('Both clients connected');
          done();
        }
      };

      clientSocket.on('connect', onConnect);
      clientSocket2.on('connect', onConnect);
    });
  });

  afterAll((done) => {
    console.log('Closing client sockets...');
    clientSocket.close();
    clientSocket2.close();
    console.log('Client sockets closed.');

    setTimeout(() => {
      console.log('Closing server...');
      ioServer.close(() => {
        server.close(() => {
          console.log('Server closed.');
          done();
        });
      });
    }, 1000); // Adding a delay to ensure all operations are completed
  });

  test('client connects to server', () => {
    expect(clientSocket.connected).toBe(true);
    expect(clientSocket2.connected).toBe(true);
  });

  test('adds a user and broadcasts users list', (done) => {
    const userId = 'user1';

    clientSocket2.once('getUsers', (usersList) => {
      console.log('Users list received:', usersList);
      expect(usersList).toContain(userId);
      done();
    });

    clientSocket.emit('addUser', userId);
  });

  test('sends and receives a message', (done) => {
    const senderId = 'user1';
    const receiverId = 'user2';
    const text = 'Hello World!';

    clientSocket2.emit('addUser', receiverId);
    clientSocket2.once('receiveMessage', (message) => {
      console.log('Message received:', message);
      expect(message).toMatchObject({ senderId, receiverId, text });
      done();
    });

    clientSocket.emit('addUser', senderId);
    clientSocket.emit('sendMessage', { senderId, receiverId, text });
  });

  test('removes user on disconnect', (done) => {
    const userId = 'user3';

    clientSocket.emit('addUser', userId);
    clientSocket2.once('getUsers', (initialList) => {
      console.log('Initial users list:', initialList);
      expect(initialList).toContain(userId);

      clientSocket.disconnect();

      clientSocket2.once('getUsers', (updatedList) => {
        console.log('Updated users list:', updatedList);
        expect(updatedList).not.toContain(userId);
        done();
      });
    });
  });
});