const { Collection } = require("discord.js");

const fs = require("fs");
const path = require("path");

const commands = new Collection();

const commandsPath = path.join(__dirname, "..", "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.set(command.data.name, command);
}

module.exports = (client) => {
  client.commands = commands;
};
