import "dotenv/config"
import cron from "node-cron";
import express from "express"
import cors from "cors"
import cronRoute from "./routes/cronRoute.js"
import { loadCronJobs } from "./services/cronJobService.js";
const PORT= process.env.PORT || 4000


const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!")
}   )

app.use('/api/job',cronRoute)



export const startServer = async () => {
  await loadCronJobs()
  app.listen(PORT, () => {
   
    console.log(`Server is running on port http://localhost:${PORT}`)
  })
}
startServer();