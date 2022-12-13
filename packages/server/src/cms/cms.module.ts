import { Module } from '@nestjs/common';
import { SharedModule } from '@/shared/shared.module';
import { ArticleController } from './controllers/article.controller';
import { CMSProviders } from './cms.providers';
import { ArticleService } from './services/article.service';
import { MenuService } from './services/menu.service';
import { MenuController } from './controllers/menu.controller';



@Module({
    imports: [
        SharedModule,
    ],
    controllers: [
        ArticleController, MenuController
    ],
    providers: [
        ...CMSProviders, ArticleService, MenuService

    ],
    exports: [
        // UserService, AuthService, ...UserProviders
    ],

})
export class CMSModule { }