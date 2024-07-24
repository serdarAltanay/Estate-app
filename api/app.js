import express from "express"
import postRoute from "./routes/post.route.js"
import authRoute from "./routes/auth.route.js"

const app = express() //now our app is ready

app.use(express.json())

app.use("/api/posts",postRoute);
app.use("/api/auth",authRoute);

app.listen(8000, () =>{
    console.log("-----------server is running----------")
})


