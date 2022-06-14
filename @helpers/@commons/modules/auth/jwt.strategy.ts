import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import { UserClaims } from '../../types/UserClaims';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AWS_COGNITO_BASE_URL}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AWS_COGNITO_APP_CLIENT_ID,
      issuer: process.env.AWS_COGNITO_BASE_URL,
      algorithms: ['RS256'],
    });
  }

  public async validate(user: any) {
    const response: UserClaims = {
      id: Number(user['cognito:username']),
      username: Number(user['cognito:username']),
      dojoId: user.dojoId,
      role: user.role,
    };

    return response;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
