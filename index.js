require("dotenv").config();

const {
  Client,
  Events,
  GatewayIntentBits,
  ActivityType,
} = require("discord.js");

const chalk = require("chalk");

const handleCreateSlashCommands = require("./src/handlers/handleCreateSlashCommands");
const handleImportCommands = require("./src/handlers/handleImportCommands");

console.log(`${chalk.cyan("[info]")} Imported dependencies.`);

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  presence: {
    status: "online",
    afk: false,
    activities: [{ name: `Dungeons & Dragons`, type: ActivityType.Playing }],
  },
});

handleCreateSlashCommands();
handleImportCommands(client);

console.log(`${chalk.cyan("[info]")} Started client.`);

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.once(Events.ClientReady, () => {
  console.log(`${chalk.cyan("[info]")} Logged as ${client.user.tag}!`);
});

client.login(process.env.TOKEN);
