    import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
    import { PrismaClient } from '@prisma/client';
    import { softDeleteMiddleware } from './middlewares/softDelete.middleware';




    @Injectable()
    export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        this.$use(softDeleteMiddleware());
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
    }
    // This service extends PrismaClient to manage database connections in a NestJS application.