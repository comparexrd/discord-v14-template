const { Collection } = require("discord.js");
const cooldown = new Collection();
const ms = require("ms");
const config = require("../config");

module.exports = {
    name: "messageCreate",

    execute: async (message) => {
        let client = message.client;

        if (message.author.bot || message.channel.type === "dm" || !message.content.startsWith(config.prefix)) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (cmd.length == 0) return;

        let command = client.commands.get(cmd);
        if (!command) command = client.commands.get(client.commandAliases.get(cmd));

        if (command) {
            if (command.cooldown) {
                if (cooldown.has(`${command.name}${message.author.id}`)) return message.channel.send({ content: `Bekleme süresi aktif, lütfen \`${ms(cooldown.get(`${command.name}${message.author.id}`) - Date.now(), { long: true }).replace("minutes", `dakika`).replace("seconds", `saniye`).replace("second", `saniye`).replace("ms", `milisaniye`)}\` sonra tekrar deneyin.` }).then(msg => setTimeout(() => msg.delete(), cooldown.get(`${command.name}${message.author.id}`) - Date.now()));

                command.run(client, message, args);

                cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown);

                setTimeout(() => {
                    cooldown.delete(`${command.name}${message.author.id}`);
                }, command.cooldown);
            } else {
                command.run(client, message, args);
            };
        } else {
            command.run(client, message, args);
        };
    }
};
