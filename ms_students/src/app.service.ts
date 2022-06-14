import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): any {
    return { message: 'Students MS is ok' };
  }
}
