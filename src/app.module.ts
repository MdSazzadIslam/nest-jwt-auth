import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

@Module({
  imports: [UserModule, MongooseModule.forRoot(process.env.MONGO_URI)],
})
export class AppModule {}
