import { dbWritable } from "./dbWriteable";
import { db } from "./db";
//let value = db["user"].orderBy("id").reverse().first();

export let userStore = dbWritable(
  "user",
  async () => {
    let ret = await db.user.orderBy("id").reverse().first();
    return ret ? ret.id : 0;
  },
  { id: 0 },
  1000
);
