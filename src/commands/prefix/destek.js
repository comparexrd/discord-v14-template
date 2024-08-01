const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "destek",
    aliases: ["invite"],
    cooldown: 5000,
    
    run: async (client, message, args) => {
        let linkButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel("Katıl")
                .setStyle(ButtonStyle.Link)
                .setURL(`https://discord.gg/mUmgFAj2as`)
        )

        const embed = new EmbedBuilder()
            .setTitle("Title")
            .setDescription(`[Botu davet etmek için tıkla](https://discord.gg/mUmgFAj2as)`)
            .setDescription("Description 2")
            .setColor("Aqua")
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))

        return message.channel.send({ embeds: [embed], components: [linkButton] });
    }
};