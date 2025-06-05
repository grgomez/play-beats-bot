# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run build        # Compile TypeScript to dist/
npm start           # Run compiled code from dist/
npm run dev         # Development mode with nodemon auto-restart
npm run deploy      # Deploy commands to test guild (TEST_GUILD)
npm run deploy-prod # Deploy commands globally to all guilds
```

## Architecture Overview

This is a Discord.js v14 bot using TypeScript with a modular, event-driven architecture:

- **Entry point**: `src/index.ts` loads environment and initializes client
- **Client setup**: `src/client/index.ts` configures Discord client with intents and registers events
- **Commands**: Category-based organization in `src/commands/` using SlashCommandBuilder
- **Events**: Discord event handlers in `src/events/` (ready, interactionCreate)
- **Types**: Comprehensive TypeScript interfaces in `src/types/`
- **Utils**: Helper functions for command/event creation and error handling

## Environment Variables

Required in `.env` file:
- `CLIENT_TOKEN`: Discord bot token
- `TEST_GUILD`: Guild ID for development command deployment

## Command Development Pattern

Commands use a factory pattern with the `command()` utility:

```typescript
const meta = new SlashCommandBuilder()
  .setName('commandname')
  .setDescription('Command description')

export default command(meta, ({ interaction }) => {
  // Command logic here
})
```

Commands are organized in categories (e.g., `src/commands/debug/`) with each category having an `index.ts` that exports all commands in that category.

## Event Development Pattern

Events use a factory pattern with the `event()` utility:

```typescript
export default event('eventName', ({ log }, ...eventArgs) => {
  // Event logic with built-in logging context
})
```

## Deployment Strategy

- **Development**: Commands deployed to specific test guild for faster updates
- **Production**: Commands deployed globally with `NODE_ENV=production`
- Command registration handled by `src/scripts/deploy.ts`