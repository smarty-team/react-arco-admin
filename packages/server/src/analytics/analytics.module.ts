import { Module } from '@nestjs/common';
import { SharedModule } from '@/shared/shared.module';
import { AnalyticsController } from './controllers/analytics.controller';

@Module({
    imports: [
        SharedModule,
    ],
    controllers: [
        AnalyticsController
    ],
    // providers: [
    //     ...CMSProviders, ArticleService, MenuService

    // ],
    exports: [
        // UserService, AuthService, ...UserProviders
    ],

})
export class AnalyticsModule { }