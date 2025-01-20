import { Controller, Get, Res } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/chat')
  async getChat(@Res() res): Promise<void> {
    const messages = await this.chatService.getMessages();
    res.json(messages);
  }

  @Get('/api/chat')
  async getChatMessages(@Res() res): Promise<void> {
    const messages = await this.chatService.getMessages();
    res.json(messages);
  }
}
