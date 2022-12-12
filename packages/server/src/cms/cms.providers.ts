import { Article } from './entities/article.mongo.entity';
import { Menu } from './entities/menu.mongo.entity';

export const CMSProviders = [
    {
        provide: 'ARTICLE_REPOSITORY',
        useFactory: async (AppDataSource) => await AppDataSource.getRepository(Article),
        inject: ['MONGODB_DATA_SOURCE'],
    },
    {
        provide: 'MENU_REPOSITORY',
        useFactory: async (AppDataSource) => await AppDataSource.getRepository(Menu),
        inject: ['MONGODB_DATA_SOURCE'],
    },
];

