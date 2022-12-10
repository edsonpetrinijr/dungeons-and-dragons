const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription(
      "Joga um dado com o número de lados desejados quantas vezes for necessário."
    )
    .addNumberOption((option) =>
      option
        .setName("quantidade")
        .setDescription("Quantas vezes você deseja rolar o dado?")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("lados")
        .setDescription("Quantos lados tem o dado que você deseja rolar?")
        .setRequired(true)
        .addChoices(
          { name: "4", value: "4" },
          { name: "6", value: "6" },
          { name: "8", value: "8" },
          { name: "10", value: "10" },
          { name: "12", value: "12" },
          { name: "20", value: "20" },
          { name: "100", value: "100" }
        )
    ),
  async execute(interaction) {
    const numberOfSidesOfTheDice = Number(
      interaction.options.getString("lados")
    );
    const numberOfRolls = Number(interaction.options.getNumber("quantidade"));

    const rolls = Array.from(
      { length: numberOfRolls },
      () => Math.floor(Math.random() * numberOfSidesOfTheDice) + 1
    );

    const embedMessage = new EmbedBuilder()
      .setTitle(
        `A rolagem \`${numberOfRolls}d${numberOfSidesOfTheDice}\` foi feita!`
      )
      .setDescription(
        `A soma de todas as rolagens é: \`${rolls.reduce(
          (accumulator, value) => {
            return accumulator + value;
          },
          0
        )}\`.`
      )
      .setFields(
        rolls.map((item, index) => {
          return {
            name: `${index + 1}ª Rolagem`,
            value: `\`${item}\``,
            inline: true,
          };
        })
      )
      .setColor("#9E553B")
      .setTimestamp()
      .setFooter({
        iconURL: interaction.user.displayAvatarURL(),
        text: `Solicitado por ${interaction.user.tag}`,
      });

    interaction.reply({ embeds: [embedMessage] });
  },
};
