const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");
console.log(uri);

const client = new MongoClient(uri);
const dbname = "sample_mflix";

const listAllDatabases = async (client) =>{
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(` - ${db.name}`);
    });
}

const connectToDatabase = async ()=>{
    try {
        await client.connect();
        await listAllDatabases(client);
        console.log((`Connected to the database: ${dbname}`))
    } catch (error) {
        console.log(`Error connecting to the database: ${error}`);
    }
}

const main = async ()=>{
    try {
        await connectToDatabase();
    } catch (error) {
        console.log(`Error connecting to the database: ${error}`);
    } finally{
        await client.close();
    }
}

main();