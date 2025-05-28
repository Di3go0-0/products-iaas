import { Module } from '@nestjs/common';
import { JwtGuardGuard } from './jwt-guard.guard';
import { AxiosModule } from '../axios/axios.module';

@Module({
  imports: [AxiosModule],
  providers: [JwtGuardGuard],
  exports: [JwtGuardGuard],
})

export class JwtGuardModule { }
