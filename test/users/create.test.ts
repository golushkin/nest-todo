import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../../src/users/users.module';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose'
import { generateDbName } from '../helpers/mongo';
import { Connection, Model } from 'mongoose';
import { getGlobalPipes } from '../../src/utils/pipes';
import { getGlobalFilters } from '../../src/utils/filters';
import { getGlobalInterceptors } from '../../src/utils/interceptors';
import { HttpAdapterHost } from '@nestjs/core';

describe('User tests', () => {
  let app: INestApplication;
  let client: request.SuperTest<request.Test>;
  const baseUrl = '/users'
  const dbName = generateDbName()
  const connectionUrl = process.env.MONGO_URI

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(connectionUrl, {dbName}), UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const httpAdapterHost = app.get(HttpAdapterHost)

    app.useGlobalPipes(...getGlobalPipes())
    app.useGlobalFilters(...getGlobalFilters(httpAdapterHost))
    app.useGlobalInterceptors(...getGlobalInterceptors())

    client = request(app.getHttpServer())
    await app.init();
  });

  afterAll(async () => {
    await app.close()
  })

  afterEach(async() => {
    const connection = app.get(getConnectionToken()) as Connection

    await Promise.all(connection.modelNames().map( async modelName => {
      const model = connection.model(modelName) as Model<{}>
      await model.collection.drop()
      connection.deleteModel(modelName)
    }))
  })

  it('create success', async () => {
    const { status, body } = await client.post(`${baseUrl}/`).send({userName: 'test', pass: 'test'})

    expect(status).toBe(201)
  });

});
