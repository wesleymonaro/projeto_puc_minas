import { ApiProperty } from '@nestjs/swagger';

export class ClassRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  weekDay: string;

  @ApiProperty()
  initHour: string;

  @ApiProperty()
  endHour: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  maxStudents: string;

  @ApiProperty()
  dojoId: string;

  @ApiProperty()
  teacherId: string;
}
