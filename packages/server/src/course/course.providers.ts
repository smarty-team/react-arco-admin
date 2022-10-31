import { Course } from './entities/course.mongo.entity';

export const CourseProviders = [
    {
        provide: 'COURSE_REPOSITORY',
        useFactory: async (AppDataSource) => await AppDataSource.getRepository(Course),
        inject: ['MONGODB_DATA_SOURCE'],
    },
];