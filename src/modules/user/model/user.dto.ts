import { UserConstructor } from '@/domain/entity';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDto implements UserConstructor {
  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public id?: string;

  @IsString()
  @IsNotEmpty()
  public name!: string;

  @IsString()
  @IsNotEmpty()
  public email!: string;

  @IsString()
  @IsNotEmpty()
  @Exclude()
  public password!: string;
}
