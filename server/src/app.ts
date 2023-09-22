import express from 'express';
import { Server } from "socket.io";
import { createServer } from "http";
import bodyParser from 'body-parser';
import routes from './routes';
// import cors from "cors";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

// app.use(cors())
app.use(bodyParser.json());

// Add your routes here
app.use('/api', routes);

io.on('connection', (socket) => {
    console.log('User connected');

    // Handle incoming messages
    socket.on('message', (message) => {
        // Broadcast the message to all connected clients
        io.emit('message', message);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

export default httpServer;