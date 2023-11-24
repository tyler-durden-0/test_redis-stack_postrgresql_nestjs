import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('proxy')
  async proxyRequest(@Query('url') url: string): Promise<any> {
    try {
      if (!url) {
        throw new HttpException('ERR_URL_IS_REQUIRED', HttpStatus.BAD_REQUEST);
      }
      const response = await axios.get(url, {
        proxy: {
          host: '45.196.48.9',
          port: 5435,
          auth: {
            username: 'jtzhwqur',
            password: 'jnf0t0n2tecg',
          },
          protocol: 'http',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
