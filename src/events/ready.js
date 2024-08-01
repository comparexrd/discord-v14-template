const { ActivityType } = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "ready",
    once: true,
    
    execute(client) {
        client.user.setPresence({ activities: [{ name: `${config.clientActivity}`, type: ActivityType.Watching }], status: "dnd" });
    }
};