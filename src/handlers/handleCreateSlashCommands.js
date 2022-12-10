const { REST, Routes } = require("discord.js");

const fs = require("fs");
const path = require("path");

const chalk = require("chalk");

const commands = [];

const commandsPath = path.join(__dirname, "..", "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

module.exports = () => {
  try {
    console.log(
      `${chalk.cyan("[info]")} Started refreshing application (/) commands.`
    );

    rest
      .put(Routes.applicationCommands(process.env.CLIENT_ID), {
        body: commands,
      })
      .then(() =>
        console.log(
          `${chalk.cyan(
            "[info]"
          )} Successfully reloaded application (/) commands.`
        )
      );
  } catch (error) {
    console.error(error);
  }
};
