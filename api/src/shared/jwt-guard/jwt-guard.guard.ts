import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AxiosService } from '../axios/axios.service';
import { Request } from 'express';

type verifyTokenType = {
  id: string;
  email: string;
  rol: string;
}
const uri = 'http://localhost:3010/auth/verify-token?token='

@Injectable()
export class JwtGuardGuard implements CanActivate {
  private readonly logger = new Logger(JwtGuardGuard.name);
  constructor(private readonly axiosService: AxiosService,) { }

  async canActivate(context: ExecutionContext,): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    this.logger.debug(token)

    if (!token) {
      this.logger.warn('No token found in Authorization header');
      throw new UnauthorizedException('Authentication token required.');
    }

    const response = await this.axiosService.get<verifyTokenType>(
      uri + token,
    );

    this.logger.debug(response)


    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return undefined;
    }

    const [type, token] = authHeader.split(' ');

    // Verifica que el tipo sea 'Bearer' (insensible a mayúsculas/minúsculas)
    return type.toLowerCase() === 'bearer' ? token : undefined;
  }
}
