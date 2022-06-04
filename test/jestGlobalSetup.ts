import { MongoMemoryServer } from 'mongodb-memory-server';

module.exports = async () => {
  const instance = await MongoMemoryServer.create({
    binary: { 
      version: "4.4.0" 
    } 
  });
  const uri = instance.getUri();
  (global as any).__MONGOINSTANCE = instance;
  process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
}