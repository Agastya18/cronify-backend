import "dotenv/config"

import express from "express"
import cors from "cors"
import cronRoute from "./routes/cronRoute.js"
const PORT= process.env.PORT || 4000


const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!")
}   )

app.use('/api/job',cronRoute)
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
  })