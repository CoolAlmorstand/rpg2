


import express, { Request, Response } from "express";
import "dotenv"
// import "./supabase/supabase.ts"
import "./upload-map/compress-map/compressmap.ts" 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;



