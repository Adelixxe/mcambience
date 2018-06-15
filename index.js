const Discord = require('discord.js');
const bot = new Discord.Client(); 
const path = require('path');
const prefix = "/";
const fs = require('fs');
const ddiff = require('return-deep-diff');
const ytdl = require('ytdl-core');

const streamOptions = { seek: 0, volume: 0.1 };

var cli = new Discord.Client({autoReconnect:true});

bot.commands = new Discord.Collection();

const url = 'https://youtu.be/ZSrVznkaMEM'

bot.on('ready', () => {
    console.log('McAmbience is ready');
});

bot.on('ready', () => {
    bot.user.setPresence(({ game: { name: " McJazz", type: 2}}));
});

bot.on("message", function (message) {
    if (message.author.equals(bot.user)) return;
    if (!message.content.startsWith(prefix)) return;

    if (message.content.startsWith(prefix)) {
        message.delete(100)
    }
});
bot.on('message', message => {
    if (message.content.startsWith('/amb')) {
        console.log('Got a song request!');
        const voiceChannel = message.member.voiceChannel;

        if (!voiceChannel) return message.reply('Please be in a voice channel first!');

        voiceChannel.join()

        .then (connection => {
            music();
        })
        
        function music() {
            const stream = message.guild.voiceConnection.playStream(ytdl(url, { filter: 'audioonly' }), streamOptions) 
            .once('end', () => music());
        }
    }
});

bot.login(process.env.BOT_TOKEN);

