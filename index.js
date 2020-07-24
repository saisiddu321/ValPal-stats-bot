const fs = require('fs');
const Discord = require('discord.js');
const { API, Regions } = require("node-valorant-api");

//const ValorantAPI = API.setRegion(Regions.NA).setToken(RGAPI-6cfe51be-aed6-4286-a5b3-b76351b6a06e);

//ValorantAPI.getContent().then(content => {
    //Handle API Response
  //  console.log(content.characters);
//}).catch(err => {
    //Handle API Exeception
  //  throw err;
//});
const {prefix, token} = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`${client.user.tag} is ready to go!`);
});

client.on('message',message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (command.args && !args.length) {
        return message.reply("no arguments provided");
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply(`there was an error: ${error}`);
    }

});
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'logging ');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
});


client.login(token);