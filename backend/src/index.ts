import express from "express";
import mongoose from "mongoose";
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import router from "./routes/route";

const PORT = 4000;
const app = express();
const server = new http.Server(app);
app.use(express.json());
app.use(cors());
const io = new Server(server, {
  cors : {
    origin: '*'
  }
});

const MONGO_URL = "mongodb://localhost:27017";
mongoose.connect(MONGO_URL, {
  dbName: 'ng17-message-app',
}).then(()=>{
  console.log("Database connected successfully!");
}).catch((error)=>{
  console.log("error: ", error);
});

app.use('/', router);

// Realtime Messages
io.on('connection', (socket: any)=>{
  socket.on('trigger-message', ()=>{
    io.emit('trigger-message');
  })
})

server.listen(PORT, ()=> {
  console.log(`Server running on http://localhost:${PORT}`);
});
