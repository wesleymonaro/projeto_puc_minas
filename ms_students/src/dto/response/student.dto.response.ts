import { ApiProperty } from '@nestjs/swagger';

export class StudentResponse {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}
