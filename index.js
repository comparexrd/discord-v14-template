const { Client, Collection, Partials } = require("discord.js");
const client = new Client({
    intents: 53608447,
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User
    ]
});
const config = require("./src/config");
const { readdirSync } = require("fs");
const moment = require("moment");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");

client.commands = new Collection()
client.slashCommands = new Collection()
client.commandAliases = new Collection()

const rest = new REST({ version: "10" }).setToken(config.token);

const log = x => {
    console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${x}`);
};

// Command Handler
const commands = [];
readdirSync("./src/commands/prefix").forEach(async file => {
    const command = await require(`./src/commands/prefix/${file}`);

    if (command) {
        client.commands.set(command.name, command);
        commands.push(command.name, command);

        if (command.aliases && Array.isArray(command.aliases)) {
            command.aliases.forEach(alias => {
                client.commandAliases.set(alias, command.name);
            });
        };
    };
});

// Slash Command Handler
const slashCommands = [];
readdirSync("./src/commands/slash").forEach(async file => {
    const command = await require(`./src/commands/slash/${file}`);
    slashCommands.push(command.data.toJSON());
    client.slashCommands.set(command.data.name, command);
});

// Ready Event
client.on("ready", async () => {
    try {
        await rest.put(Routes.applicationCommands(client.user.id), {
            body: slashCommands
        },
        );
    } catch (error) {
        console.error(error);
    };

    log(`${client.user.username} aktif edildi.`);
});

// Event Handler
readdirSync("./src/events").forEach(async file => {
    const event = await require(`./src/events/${file}`);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    };
});

// NodeJS Events
process.on("unhandledRejection", e => {
    console.log(e);
});
process.on("uncaughtException", e => {
    console.log(e);
});
process.on("uncaughtExceptionMonitor", e => {
    console.log(e);
});

// Web
const express = require("express");
const app = express();

app.listen(config.port);
app.get("/", (req, res) => {
    res.sendStatus(200);
});
console.log(`http://localhost:${config.port} sunucusunda dinleniyor, aktif.`);

client.login(config.token);
