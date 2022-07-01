import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LocalFilesModule } from './local-files/local-files.module';
import * as Joi from "@hapi/joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),

        // JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        // JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        // JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        // JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),

        SESSION_SECRET: Joi.string().required(),

        UPLOADED_FILES_DESTINATION: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    LocalFilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
