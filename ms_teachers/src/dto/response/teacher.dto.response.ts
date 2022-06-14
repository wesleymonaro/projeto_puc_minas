import { ApiProperty } from '@nestjs/swagger';

export class TeacherResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
