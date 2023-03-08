// JWT 策略

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // TODO
      secretOrKey: process.env.JWT_SECRET,
      // secretOrKey: 'ranshu666'
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
    };
  }
}