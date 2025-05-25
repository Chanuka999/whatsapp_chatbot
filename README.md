# WhatsApp AI Chatbot (NestJS)

This project is a WhatsApp chatbot built with [NestJS](https://nestjs.com/) that integrates with the OpenAI API to provide AI-powered responses to WhatsApp messages. It uses the WhatsApp Cloud API for messaging and OpenAI's GPT models for generating replies.

## Features

- Receives WhatsApp messages via webhook
- Sends automated replies using OpenAI (GPT-4o, GPT-3.5, etc.)
- Modular NestJS structure
- TypeScript support
- Environment-based configuration

## Project Structure

```
whatsapp_bot/
├── src/
│   ├── app.controller.ts           # Main app controller
│   ├── app.module.ts               # Main app module
│   ├── app.service.ts              # Main app service
│   ├── main.ts                     # Entry point
│   ├── config/
│   │   └── AppConfig.ts            # App configuration (API keys, etc.)
│   ├── openai/
│   │   ├── openai.service.ts       # OpenAI integration service
│   │   └── openai.service.spec.ts  # OpenAI service tests
│   └── whatsapp/
│       ├── whatsapp.controller.ts  # WhatsApp webhook controller
│       ├── whatsapp.service.ts     # WhatsApp messaging service
│       └── whatsapp.controller.spec.ts # WhatsApp controller tests
│       └── whatsapp.service.spec.ts    # WhatsApp service tests
├── package.json                    # Project dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── nest-cli.json                   # NestJS CLI config
├── .env                            # Environment variables (not committed)
├── .gitignore                      # Git ignore rules
└── README.md                       # Project documentation (this file)
```

## Sample .env

```
WHATAPP_CHALLENGE_KEY=sample_challenge_key
WHATSAPP_PHONE_NUMBER_ID=1234567890
WHATSAPP_API_KEY=sample_whatsapp_api_key
WHATSAPP_API_VERSION=v17.0
OPENAI_API_KEY=sample_openai_api_key
```

## Setup & Installation

1. **Clone the repository:**

   ```sh
   git clone <repo-url>
   cd whatsapp_bot
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment variables:**

   - Copy the sample above to your `.env` file and fill in your WhatsApp and OpenAI API keys.

4. **Run the application:**

   ```sh
   npm run start:dev
   ```

5. **Expose your local server to the internet** (for WhatsApp webhook):
   - Use [ngrok](https://ngrok.com/) or similar to expose your local port.
   - Set the webhook URL in your WhatsApp Cloud API dashboard.

## Usage

- Send a message to your WhatsApp bot number.
- The bot will reply with an AI-generated response using OpenAI.

## Scripts

- `npm run start` - Start the app
- `npm run start:dev` - Start in watch mode
- `npm run test` - Run tests
- `npm run lint` - Lint code

## Dependencies

See `package.json` for the full list. Key dependencies:

- `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express` - NestJS framework
- `@nestjs/config` - Environment config
- `axios` - HTTP requests
- `openai` - OpenAI API client
- `typescript` - TypeScript support

## License

This project is UNLICENSED. See `package.json` for details.

---

**Note:** This project is for educational/demo purposes. Do not expose your API keys in public repositories.
