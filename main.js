const Discord = require('discord.js');
const Sequelize = require('sequelize');
const client = new Discord.Client();
const serverDb = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'serverDb.sqlite',
});
const serverDbTags = serverDb.define('serverDbTags', {
//	serverId: {
//		type: Sequelize.INTEGER,
//		defaultValue: 0,
//		allowNull: false,
//	}
		serverId: Sequelize.STRING,
});
const userDb = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'userDb.sqlite',
});
const userDbTags = userDb.define('userDbTags', {
	username: Sequelize.STRING, 
	tagNum: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
//	serverId: {
//		type: Sequelize.INTEGER,
//		defaultValue: 0,
//		allowNull: false,
//	}
	serverId: Sequelize.STRING, 
	userId: Sequelize.STRING,
});
const prefix = 'a!'
const fs = require('fs'); 
client.commands = new Discord.Collection(); 
const commandFiles = fs.readdirSync('./').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
	    const command = require(`./${file}`); 
	    client.commands.set(command.name, command);
}
client.login('BOT_TOKEN');
client.once('ready', () => {
	serverDbTags.sync();
	userDbTags.sync();
	console.log("Anonycord is online");	
});
client.on('guildCreate', guild =>  {
	async function serverIdFetch() {
		try  {
			const serverIdFetch = await serverDbTags.create({
				serverId: guild.guild.id,
			});
		} catch (e) {
			if (e.name === 'SequelizeUniqueConstraintError') {
				serverIdFetch.serverId === guild.guild.id;
			}
		}
	}
	serverIdFetch();
});
client.on('message', message => {
	if(!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
//	if (command === 'init') {
//		client.commands.get('init').execute(message, args, serverDbTags, userDbTags);
//		async function functionInit(message, args, serverDbTags, userDbTags) {
//		if (args[0] === 0) {
//			message.reply("Input a server ID! Need help? Your gay!");
//		}
//		else {
//
//			message.reply(`Searching for server with ID: ${args[0]}`);
//			async function functionServerfind() {
//				const serverFind = serverDbTags.findOne({ where: {serverId: args[0]} });	
//			}
//			console.log(serverFind)
//			const randomTagNum = Math.floor(Math.random() * 100000) + 99999;
//			const username = message.author.username
//			if (serverFind) {
	//			try {
	//				const tag = userDbTags.create({ 
	//					username: username,
	//					tagNum: randomTagNum,
	//					serverId: args,
	//				});
	//			return message.reply(`Username: ${tag.username}\nTag: ${tag.tagNum}\nServer ID: ${args[0]}`);
	//			} catch (e) { 
	//				if (e.name === 'SequelizeUniqueConstraintError') {
	//					return message.reply("You already have a tag! Do you wanna reset a tag? Try a!reset-tag.");
	//				}
	//			}
//	//			return message.reply(`Username: ${tag.username}\nTag: ${tag.tagNum}\nServer ID: ${args[0]}`);
	//	 	}
	//	}
//			else {
//				return message.reply('Server ID not found.');
//			}
//		 return message.reply('error: something went wrong, please try again!');
//		}
//	}		
	if (command === 'accept') {
		async function serverIdFetch() {
			try  {
				const serverIdFetch = await serverDbTags.create({
					serverId: message.guild.id,
				});
			return message.channel.send(`ServerID ${serverIdFetch.serverId} put into databse`);
			} catch (e) {
				if (e.name === 'SequelizeUniqueConstraintError') {
					serverIdFetch.serverId === message.guild.id;
				}
			}
		}
		if (message.member.hasPermission('ADMINISTRATOR')) {
			serverIdFetch();
		}
		else {
			message.reply("You are not an Adminstrator");
		}
	}
	else if  (command === 'init2') {
		client.commands.get('init2').execute(message, args, serverDbTags, userDbTags);
	}
	else if (command === 'help') {
		message.author.send('List of Commands:\na!help: sends this message\na!init: assigns a random tag number to you');
	}
	else if (command === 'msg') {
		client.commands.get('msg').execute(message, args, userDbTags, client, Discord, command, prefix);	
	}
	else if (command === 'tags-info') {
		client.commands.get('tags-info').execute(message, args, command, userDbTags, serverDbTags, client);
	}
	else if (command === 'username') {
		message.author.send(message.author.username);
	}
	else if (command === 'guild-test') {
		console.log(message.guild);
	}
});
