import {
  Controller,
  Get,
  Logger,
  Post,
  Req,
  Res,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Controller('whatsapp')
export class WhatsappService {
  async sendMessage(to: string, message: string) {
    const data = JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to,
      type: 'text',
      text: {
        preview_url: false,
        body: message,
      },
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  handleUserMessage(senderNumber: string, messageText: string): void {
    // TODO: Implement your logic to handle the user message
    // Parameters used: senderNumber, messageText
    void senderNumber;
    void messageText;
  }
}

export class WhatsappController {
  private readonly logger = new Logger(WhatsappController.name);

  constructor(
    @Inject(forwardRef((): typeof WhatsappService => WhatsappService))
    private readonly whatsappService: WhatsappService,
    private readonly configService: ConfigService,
  ) {}

  @Get('test')
  test(): string {
    return 'pasindu';
  }

  @Get('webhook')
  challengeWebhook(@Req() req: Request, @Res() res: Response): void {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    const VERIFY_TOKEN = this.configService.get<string>(
      'WHATSAPP_CHALLANGE_KEY',
    );

    if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
      this.logger.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }

  @Post('webhook')
  handleWebhook(@Req() req: Request, @Res() res: Response): void {
    try {
      const payload = req.body as {
        entry?: Array<{
          changes?: Array<{
            value?: {
              contacts?: Array<{
                wa_id?: string;
                profile?: { name?: string };
              }>;
              messages?: Array<{
                text?: { body?: string };
              }>;
            };
          }>;
        }>;
      };

      const change = payload?.entry?.[0]?.changes?.[0]?.value;
      const senderNumber = change?.contacts?.[0]?.wa_id;
      const messageText = change?.messages?.[0]?.text?.body;
      const senderName = change?.contacts?.[0]?.profile?.name;

      if (!senderNumber || !messageText) {
        this.logger.warn('Invalid message payload received');
        res.sendStatus(400);
        return;
      }

      this.logger.log(`Sender Number: ${senderNumber}`);
      this.logger.log(`Message: ${messageText}`);
      this.logger.log(`Sender Name: ${senderName}`);

      this.whatsappService.handleUserMessage(senderNumber, messageText);

      res.sendStatus(200);
    } catch (error) {
      this.logger.error('Error handling webhook', error);
      res.sendStatus(500);
    }
  }
}
