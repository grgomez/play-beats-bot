# Play Beats Bot

A Discord DJ bot built with Discord.js v14 and TypeScript, featuring a modular architecture for extensible command and event handling.

## Features

- **Slash Commands**: Modern Discord slash command support
- **Modular Architecture**: Organized command categories and event handlers
- **TypeScript**: Full type safety and IntelliSense support
- **Hot Reload**: Development mode with automatic restart
- **Guild-specific Testing**: Deploy commands to test servers for faster development

## Commands

### Debug Commands
- `/ping [message]` - Ping the bot with an optional custom message

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Discord Bot Token
- Discord Application with bot permissions

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd play-beats-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   CLIENT_TOKEN=your_discord_bot_token
   TEST_GUILD=your_test_guild_id
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

## Usage

### Development
```bash
npm run dev          # Start with auto-restart
npm run deploy       # Deploy commands to test guild
```

### Production
```bash
npm run build        # Compile TypeScript
npm start           # Run compiled code
npm run deploy-prod  # Deploy commands globally
```

## Project Structure

```
src/
├── client/          # Discord client configuration
├── commands/        # Slash command implementations
│   └── debug/       # Debug category commands
├── events/          # Discord event handlers
├── scripts/         # Deployment and utility scripts
├── types/           # TypeScript type definitions
└── utils/           # Helper functions and utilities
```

## Development

### Adding Commands

Commands use a factory pattern with category organization:

```typescript
// src/commands/category/command.ts
import { SlashCommandBuilder } from 'discord.js'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
  .setName('commandname')
  .setDescription('Command description')

export default command(meta, ({ interaction }) => {
  // Command logic here
})
```

### Adding Events

Events follow a similar pattern:

```typescript
// src/events/eventName.ts
import { event } from '../utils'

export default event('eventName', ({ log }, ...eventArgs) => {
  // Event logic with built-in logging
})
```

## Dependencies

### Runtime
- **discord.js**: Discord API wrapper
- **dotenv**: Environment variable management
- **cross-env**: Cross-platform environment variables

### Development
- **TypeScript**: Type checking and compilation
- **nodemon**: Development auto-restart
- **ts-node**: TypeScript execution

## Configuration

The bot uses environment variables for configuration:

- `CLIENT_TOKEN`: Your Discord bot token (required)
- `TEST_GUILD`: Guild ID for development command deployment
- `NODE_ENV`: Set to 'production' for global command deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `npm run dev`
5. Submit a pull request

## Development Resources

- https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3
- https://discord.js.org/#/docs/main/stable/topics/voice
- https://blog.pragmatists.com/let-your-javascript-variables-be-constant-1633e56a948d
- https://openbase.io/js/ytdl-core
- https://gabrieltanner.org/blog/dicord-music-bot
- https://www.npmjs.com/package/yt-search
- https://www.writebots.com/how-to-make-a-discord-bot/

## License

ISC

