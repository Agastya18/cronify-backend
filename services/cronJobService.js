import cron from "node-cron";
import {prisma} from "../db/prisma.js"
import { execute, getCronExpression } from "../utils/utils.js";
export const MAX_RETRIES = 3;
export const RETRY_DELAY_MS = 5000;

export const loadCronJobs= async()=>{
   try {
    const cronJobs = await prisma.cronJob.findMany({
        where: { isActive: true },
      });
     for (const job of cronJobs){
        const { schedule, title, id, url } = job;
        const cronExpression = getCronExpression(schedule);
        const scheduledJob = cron.schedule(cronExpression, async () => {
          await execute(url)
          console.log("inside laod")
        })
        scheduledJob.start()
     }
     console.log("Cronjobs loaded ✅");
    
   } catch (error) {

    console.error("Error in loading cronjobs fron DB : ", err);
    
   }
}