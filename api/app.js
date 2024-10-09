import express from "express"
import cors from "cors"
import postRoute from "./routes/post.route.js"
import authRoute from "./routes/auth.route.js"
import testRoute from "./routes/test.route.js"
import userRoute from "./routes/user.route.js"
import  { MongoClient } from "mongodb"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser"

dotenv.config();

const url = process.env.DATABASE_URL
const app = express() //now our app is ready

const client = new MongoClient(url)

app.use(cors({origin: process.env.CLIENT_SIDE_URL, credentials:true}))
app.use(express.json())
app.use(cookieParser())

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/posts",postRoute);
app.use("/api/auth",authRoute);
app.use("/api/test",testRoute)
app.use("/api/users",userRoute)

app.listen(8000, () =>{
    console.log("-----------server is running----------")
})

async function run() {
    try {
        await client.connect();
        console.log("Successfully connected to Atlas");
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);
