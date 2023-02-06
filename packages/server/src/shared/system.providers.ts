import { Dictionary } from './entities/dictionary.mongo.entity';

export const SystemProviders = [
    {
        provide: 'DICTIONARY_REPOSITORY',
        useFactory: async (AppDataSource) => await AppDataSource.getRepository(Dictionary),
        inject: ['MONGODB_DATA_SOURCE'],
    },
];

