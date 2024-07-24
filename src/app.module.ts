import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/taskmagnet', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
