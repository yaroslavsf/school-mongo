import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserCreateDTO {
    @ApiProperty({
        type: String,
        required: true,
        example: 'yaroslavsf',
        description: 'Nichname of the user',
    })
    @IsString()
    public readonly username: string;
    @ApiProperty({
        type: String,
        required: true,
        example: 'yaroslav15987533@gmail.com',
        description: 'Email of the user',
    })
    @IsString()
    public readonly email: string;
    @ApiProperty({
        type: String,
        required: true,
        example: 'QWE123',
        description: 'Password of the user',
    })
    @IsString()
    public readonly password: string;

    @ApiProperty({
        type: String,
        required: true,
        example: 'yaroslav15987533@gmail.com',
        description: 'Email of the user',
    })
    @IsString()
    public readonly profile_image: string;
}
