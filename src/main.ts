import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as mySqlSession from "express-mysql-session";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.setBaseViewsDir(join(__dirname, "..", "views"))
  app.useStaticAssets(join(__dirname, "..", "public"))
  app.setViewEngine("ejs")

  //pour enregistrement des données de session en bdd
  const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'nest_todoapp'
  };
  const MySqlStore = mySqlSession(session)
  const store = new MySqlStore(options)
  // somewhere in your initialization file :mise en place de la session
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      store : store
    }),
  );

  await app.listen(3000);
}
bootstrap();
