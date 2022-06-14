import { ApiProperty } from '@nestjs/swagger';

export class PresenceRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  dojoId: string;

  @ApiProperty()
  studentId: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  status: number;
}
