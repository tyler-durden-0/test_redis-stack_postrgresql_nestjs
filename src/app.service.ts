import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async requestProxy(): Promise<any> {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos',
      );
      return response.data;
    } catch (error) {
      // Обработка ошибок
      throw error;
    }
  }
}
