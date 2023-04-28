import { MongoClient, MongoClientOptions, Db } from 'mongodb';

interface CustomMongoClientOptions extends MongoClientOptions {
    useNewUrlParser?: boolean;
    useUnifiedTopology?: boolean;

}

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'school-management';

const options: CustomMongoClientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

export async function connectToDatabase(): Promise<[MongoClient, Db]> {
    try {
        const client = await MongoClient.connect(connectionURL, options);
        const db: Db = client.db(databaseName);  
        console.log('Successfully connected to the database: ' + databaseName);
    
        return [client, db];
      } catch (error) {
        console.log('Error while trying to connect to db' + error);
        throw error;
      }
  }
  
