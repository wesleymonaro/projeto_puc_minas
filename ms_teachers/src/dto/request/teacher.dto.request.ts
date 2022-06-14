import { ApiProperty } from '@nestjs/swagger';

export class TeacherRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  dojoId: string;

  @ApiProperty()
  beltId: string;

  @ApiProperty()
  beltDegreeColorId: string;
}
