import express from "express";
import mongoose from "mongoose";
import router from "./routes/route";

const PORT = 4000;
const app = express();
app.use(express.json());

const MONGO_URL = "mongodb://localhost:27017";
mongoose.connect(MONGO_URL, {
  dbName: 'ng17-message-app',
}).then(()=>{
  console.log("Database connected successfully!");
}).catch((error)=>{
  console.log("error: ", error);
});

app.use('/', router);

app.listen(PORT, ()=> {
  console.log(`Server running on http://localhost:${PORT}`);
});
