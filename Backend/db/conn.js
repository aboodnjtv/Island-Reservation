const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
 
module.exports = {
  connectToServer: async function (callback) {
    await client.connect(async function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("clients");
        console.log("Successfully connected to MongoDB."); 

        await listDatabases(client);
      }
      return callback(err);
         });

    // await listDatabases(client);
  },
 
  getDb: function () {
    return _db;
  },

  getClient: function () {
    return client;
  }
};