import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../../src/users/users.module';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose'
import { generateDbName, createUser } from '../helpers/mongo';
import { Connection, Model } from 'mongoose';
import { getGlobalPipes } from '../../src/utils/pipes';
import { getGlobalFilters } from '../../src/utils/filters';
import { getGlobalInterceptors } from '../../src/utils/interceptors';
import { User } from '../../src/schemas/user.schema'
import { HttpAdapterHost } from '@nestjs/core';
import { checkSuccessBody } from '../helpers/check';

describe('User patch tests', () => {
  let app: INestApplication;
  let client: request.SuperTest<request.Test>;
  let connection: Connection
  let userModel: Model<User>
  const baseUrl = '/users'
  const dbName = generateDbName()
  const connectionUrl = process.env.MONGO_URI

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(connectionUrl, { dbName }), UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const httpAdapterHost = app.get(HttpAdapterHost)

    app.useGlobalPipes(...getGlobalPipes())
    app.useGlobalFilters(...getGlobalFilters(httpAdapterHost))
    app.useGlobalInterceptors(...getGlobalInterceptors())

    client = request(app.getHttpServer())
    await app.init();

    connection = app.get(getConnectionToken()) as Connection
    userModel = connection.model<User>(User.name)
  });

  afterAll(async () => {
    await app.close()
  })

  afterEach(async () => {
    await Promise.all(connection.modelNames().map(async modelName => {
      const model = connection.model(modelName) as Model<{}>
      await model.collection.drop()
      connection.deleteModel(modelName)
    }))
  })

  it('patch success', async () => {
    const newUserName = 'test1'
    const { _id: userId } = await createUser(userModel)
    const { status, body } = await client.patch(`${baseUrl}/${userId}`).send({ userName: newUserName })

    expect(status).toBe(200)
    checkSuccessBody(body)

    const data = await userModel.findById(userId)
    expect(data).toBeTruthy()
    expect(data.userName).toBe(newUserName)
  });
});
