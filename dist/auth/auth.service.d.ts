import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(username: string, password: string): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    validateUser(payload: any): Promise<any>;
}
