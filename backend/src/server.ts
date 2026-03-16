


import express, { Request, Response } from "express";
// import { uploadTest, getAvailableMaps } from "./supabase/supabase.ts";
import "dotenv"
import cors from "cors"
import multer from "multer"
import roomsRouter from "./routes/room-router.ts"
// import "./upload-map/compress-map/compressmap.ts" 

import { GameRoomManager } from "./game-room/game-room-manager"; 

const gameRoomManager = new GameRoomManager()

const app = express();
const PORT = process.env.PORT || 3000;

const fileUpload = new multer({storage: multer.memoryStorage()})

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use("/rooms", roomsRouter)


app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.post("/upload-map", fileUpload.single("file"), (req, res) => {
  uploadTest(req.file.buffer)
  res.send("upload succesful")
})


app.get("/maps/get-available", async (req, res) => {
  const availableMaps = await getAvailableMaps()
  res.send(availableMaps)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;



