


import express, { Request, Response } from "express";
import { uploadTest, getAvailableMaps } from "./supabase/supabase.ts";
import "dotenv"
import cors from "cors"
import multer from "multer"
import "./upload-map/compress-map/compressmap.ts" 

const app = express();
const PORT = process.env.PORT || 3000;

const fileUpload = new multer({storage: multer.memoryStorage()})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

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



