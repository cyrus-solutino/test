import { MongoClient, Db, Document } from "mongodb";
import _const from "../_const";
import dotenv from "dotenv";

dotenv.config();

class MongoDBWrapper {

  private static clients: {
    [k: string]: MongoClient;
  } = { };

  private static dbs: {
    [k: string]: Db | undefined;
  } = { };

  constructor(uri: string = '', name: string = 'main') {

    if(!uri) {
      uri = process.env.MONGODB_URI || '';
    }

    // Only create one MongoClient instance per application
    if (!MongoDBWrapper.clients.hasOwnProperty(name)) {
      MongoDBWrapper.clients[name] = new MongoClient(uri, { family: 4 });
    }
  }

  async connect(name: string = 'main') {

    if (MongoDBWrapper.clients[name].db()) {
      await MongoDBWrapper.clients[name].connect();
      MongoDBWrapper.dbs[name] = MongoDBWrapper.clients[name].db(); // Automatically connects to the database in the URI
      console.log("Connected successfully to MongoDB");
    } else {
      MongoDBWrapper.dbs[name] = MongoDBWrapper.clients[name].db(); // Retrieve the already connected database instance
    }

  }

  getDB(name: string = 'main'): Db {
    if (!MongoDBWrapper.dbs[name]) {
      throw new Error("Database not initialized. Call connect first.");
    }

    return <Db>MongoDBWrapper.dbs[name];
  }

  startSession(name: string = 'main') {
    return MongoDBWrapper.clients[name].startSession();
  }

  // Only call this method to close the connection when your application is shutting down
  async close(name: string = 'main') {
    await MongoDBWrapper.clients[name].close();
    console.log("Disconnected from MongoDB");
  }

  c<T extends Document>(collectionName: string, clientName: string = 'main') {
    return this.getDB(clientName).collection<T>(collectionName);
  }

  SAUser() {
    return this.getDB().collection(_const.collection.user);
  }

  SACompany() {
    return this.getDB().collection(_const.collection.company);
  }

  SADocument() {
    return this.getDB().collection(_const.collection.document);
  }

  SACompanyEmails() {
    return this.getDB().collection(_const.collection.companyemails);
  }

  systemVariable() {
    return this.getDB().collection(_const.collection.systemVariable);
  }

  bulkRequest() {
    return this.getDB().collection(_const.collection.bulkRequest);
  }

  Job() {
    return this.getDB().collection(_const.collection.bullmq.job);
  }

  SAInvite(){
    return this.getDB().collection(_const.collection.invitations)
  }

  Notifications() {
    return this.getDB().collection(_const.collection.notifications);
  }

}

export default MongoDBWrapper;
