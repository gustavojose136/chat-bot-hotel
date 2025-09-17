import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: async (configService: ConfigService) => ({
            type: 'mssql',
            host: configService.get<string>('DB_HOST') || 'localhost',
            port: +configService.get<number>('DB_PORT') || 1433,
            username: configService.get<string>('DB_USERNAME') || 'sa',
            password: configService.get<string>('DB_PASSWORD') || 'password',
            database: configService.get<string>('DB_NAME') || 'master',
            entities: [__dirname + '/entities/**'],
            synchronize: false,
            options: {
                encrypt: false,
                trustServerCertificate: true,
                enableArithAbort: true
             }
        }),
        inject: [ConfigService]
    })]
})
export class DbModule {}