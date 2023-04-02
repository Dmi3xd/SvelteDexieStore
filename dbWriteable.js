import { db } from "./db";

export function dbWritable(store, key, value, ttl = 0) {
  let subscribeFunctions = [];

  async function init() {
    // checks if code runs in the browser and loads data from db
    if (typeof key === "function") {
      // do something
      key = await key();
      console.log(key);
    }
    /*
    if (!key) {
      value = await db[store].orderBy("id").reverse().first();
      if (value) key = value.id;
    }
    */
    let data = await db[store].get(key);

    // sets value of writable to data loaded
    if (data) {
      set(data);
    }
  }

  function set(newValue) {
    value = newValue;

    subscribeFunctions.forEach((func) => func(newValue));
    const timeNow = Math.floor(Date.now() / 1000);

    // saves value to db
    value.ttl = timeNow + ttl;

    //console.log("save");
    db[store].put(value);
  }

  function update(callback) {
    set(callback(value));
  }

  async function subscribe(callback) {
    subscribeFunctions.push(callback);

    callback(value);

    return function () {
      subscribeFunctions = subscribeFunctions.filter(
        (func) => func !== callback
      );
    };
  }

  init();

  return { set, update, subscribe };
}
