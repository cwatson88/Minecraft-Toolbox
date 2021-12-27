//@ts-ignore
import { openDB, IDBPDatabase, DBSchemaValue } from "idb";

export class Database {
  databaseName: string;
  storeName: string;
  dbPromise: Promise<IDBPDatabase<DBSchemaValue>>;

  constructor(databaseName: string, storeName: string) {
    this.databaseName = databaseName;
    this.storeName = storeName;

    this.dbPromise = openDB<DBSchemaValue>(databaseName, 1, {
      upgrade(db) {
        db.createObjectStore(storeName);
      }
    });
  }

  async get(key: string) {
    return (await this.dbPromise).get(this.storeName, key);
  }
  async getAll() {
    return (await this.dbPromise).getAll(this.storeName);
  }

  async set(key: string, val: any) {
    return (await this.dbPromise).put(this.storeName, val, key);
  }

  async del(key: string) {
    return (await this.dbPromise).delete(this.storeName, key);
  }

  async clear() {
    return (await this.dbPromise).clear(this.storeName);
  }

  async keys() {
    return (await this.dbPromise).getAllKeys(this.storeName);
  }
}
