import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as mySqlSession from "express-mysql-session";
import { localData } from "./middlewares/localsData";


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.setBaseViewsDir(join(__dirname, "..", "views"))
  app.useStaticAssets(join(__dirname, "..", "public"))
  app.setViewEngine("ejs")

  //pour enregistrement des données de session en bdd
  const options = {
    host: 'containers-us-west-99.railway.app',
    port: 6409,
    user: 'root',
    password: 'DyhQZI1kydyTBIJgGJ6I',
    database: 'railway'
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

  app.use(localData);
  await app.listen(80);
}
bootstrap();
