import { Module } from '@nestjs/common';
import { JwtGuardModule } from './jwt-guard/jwt-guard.module';
import { AxiosModule } from './axios/axios.module';

@Module({
  imports: [JwtGuardModule, AxiosModule]
})
export class SharedModule { }
