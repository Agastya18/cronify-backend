import cronParser from "cron-parser";
import axios from "axios";



export const getCronExpression =(schedule)=>{

    // return `*/${schedule} * * * *`;
    return `*/${schedule} * * * *`;

}

export const execute = async (url) => {
    try {
      const response = await axios.head(url, {
        timeout: 10000,
      });
      return response;
    } catch (err) {
      throw err;
    }
  };