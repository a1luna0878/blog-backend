import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: LoginDto): Promise<import("./user.entity").User>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
    }>;
}
