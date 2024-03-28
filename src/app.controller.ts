import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { BlogCreateDTO } from './dto/blog.create';
import { UserCreateDTO } from './dto/user.create';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/blogs')
  getBlogs(): Promise<any> {
    return this.appService.getBlogs();
  }

  @Post('/users/:id/blog')
  createBlog(
    @Param('id') userId: string,
    @Body() body: BlogCreateDTO,
  ): Promise<any> {
    return this.appService.createBlog(userId, body);
  }

  @Get('/users')
  getUsers(): Promise<any> {
    return this.appService.getUsers();
  }
  @Post('/register')
  createUser(@Body() body: UserCreateDTO): Promise<any> {
    return this.appService.createUser(body);
  }
}
