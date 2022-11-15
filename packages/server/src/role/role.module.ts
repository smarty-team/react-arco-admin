import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/common/database/database.module';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleProviders } from './role.providers';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    RoleController
  ],
  providers: [...RoleProviders, RoleService,],
  exports: [RoleService, ...RoleProviders],
})
export class RoleModule { }