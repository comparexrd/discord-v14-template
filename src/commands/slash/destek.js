const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("destek")
        .setDescription("Destek sunucusunu verir."),

    run: async (client, interaction) => {
        interaction.channel.send("https://discord.gg/mUmgFAj2as")
    }
};