import { DataSource, DataSourceOptions } from 'typeorm';
const path = require('path');
import { ConfigService } from '@nestjs/config';

// 设置数据库类型
const databaseType: DataSourceOptions['type'] = 'mongodb';
// 数据库注入
export const DatabaseProviders = [
    {
        provide: 'MONGODB_DATA_SOURCE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const config = {
                type: databaseType,
                url: configService.get<string>('database.url'),
                username: configService.get<string>('database.user'),
                password: configService.get<string>('database.pass'),
                database: configService.get<string>('database.name'),
                entities: [path.join(__dirname, `../../**/*.mongo.entity{.ts,.js}`)],
                logging: configService.get<boolean>('database.logging'),
                synchronize: configService.get<boolean>('database.synchronize'),
            }

            const ds = new DataSource(config)
            await ds.initialize()
            return ds
        }
    }
];