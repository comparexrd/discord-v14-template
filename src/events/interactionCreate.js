const { InteractionType } = require("discord.js");
const config = require("../config");

module.exports = {
    name: "interactionCreate",

    execute: async (interaction) => {
        let client = interaction.client;

        if (interaction.type == InteractionType.ApplicationCommand) {
            if (interaction.user.bot) return;

            try {
                const command = client.commands.get(interaction.commandName);

                command.run(client, interaction);
            } catch {
                interaction.reply({ content: `Komut çalıştırılırken bir sorunla karşılaşıldı, lütfen kurucuma ulaşın. (<@` + config.owner + `>)`, ephemeral: true });
            };
        };
    }
};
