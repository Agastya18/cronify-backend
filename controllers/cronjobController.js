import {CronJobCreateSchema} from '../validators/cronjob.validator.js'
import {prisma} from "../db/prisma.js"
import { getCronExpression,execute } from '../utils/utils.js';
import cron from "node-cron";
export const createCronjob =async(req,res)=>{
    try {
        const result = CronJobCreateSchema.safeParse(req.body);
       // console.log(result);

        if (!result.success) {
          console.error("Error validating CronJobCreate schema : ", result.error);
          res.status(400).json("Validation failed");
          return;
        }
        const { userId, title, url, schedule } = result.data;
        const newJob = await prisma.cronJob.create({
            data:{
                userId,
                title,
                url,
                schedule,
                isActive:true
            }
        })

        const cronExpression = getCronExpression(schedule)
      const job= cron.schedule(cronExpression,async()=>{

      await  execute(url)
       console.log(url)

       
       })
    //    await prisma.log.create({
    //     data:{
    //         cronJobId: newJob.id
    //     }
    //    })
       
       res.status(200).json({ message: "Cron job created!!" });

       
    } catch (error) {

        console.log(error)
        
    }
}