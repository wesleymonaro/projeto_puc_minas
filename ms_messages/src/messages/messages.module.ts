import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';

@Module({
  imports: [
    // TypeOrmModule.forFeature([BeltEntity]),
    // TypeOrmModule.forFeature([BeltDegreeColorEntity]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
