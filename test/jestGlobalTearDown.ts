import { MongoMemoryServer } from 'mongodb-memory-server';

module.exports = async () => {
  const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;
  await instance.stop();
}