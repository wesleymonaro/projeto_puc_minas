import { ApiProperty } from '@nestjs/swagger';
import { DojoAddress, DojoGeo, DojoPhoto } from '@commons/types/Dojo';

export class DojoResponse {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  openingHours: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  logoImage: string;

  @ApiProperty()
  causes: string[];

  @ApiProperty()
  phones: string[];

  @ApiProperty()
  address: DojoAddress;

  @ApiProperty()
  photos: DojoPhoto[];

  @ApiProperty()
  geo: DojoGeo;

  @ApiProperty()
  acceptsDonateItems: string[];
}
