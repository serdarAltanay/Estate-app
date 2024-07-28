import express from "express"
import postRoute from "./routes/post.route.js"
import authRoute from "./routes/auth.route.js"
import  { MongoClient } from "mongodb"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

dotenv.config();

const url = process.env.DATABASE_URL

const app = express() //now our app is ready

const client = new MongoClient(url)

app.use(express.json())
app.use(cookieParser())

app.use("/api/posts",postRoute);
app.use("/api/auth",authRoute);

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
