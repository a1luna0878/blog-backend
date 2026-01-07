import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([User]),

    JwtModule.register({
      secret: 'SECRET_KEY', // потом вынесешь в env, не геройствуй
      signOptions: { expiresIn: '1d' },
    }),
  ],
})

export class AuthModule {}
