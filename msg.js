//module.exports = {
//	name: 'msg',
//	description: 'messaging system',
//	execute(message, args, userDbTags) {
//		async function functionMsg(message, args, userDbTags){
//			const arg0 = await userDbTags.findOne({where: {tagNum: args[0]} });
//			if (arg0 === null) {
//				message.reply("Tag Number doesn't exist");
//			}
//			else {
//				userDbTags.get('username');
//			}
//				message.reply("Tag exists");
//				userDbTags.get('username');
//				if (userDbTags.get('username') === message.author.username) {
//					const serverMsgId = client.guild.resolve(userDbTags.get('serverId'));
//					const channelMsgId = message.serverMsgId.channels.cache.find(channel => channel.name === args[1]).id
//					const tagNumber = userDbTags.get('tagNum');
//					client.channels.get(channelMsgId).send(`<From ${tagNumber}> ${args[2]}`)
//					message.author.send(`Tag ${args[0]} doesn't belong to you!`);
//				}
//				else {
//					message.reply("Tag exists");
//					userDbTags.get('username');
//					if (userDbTags.get('username') === message.author.username) {
//						const serverMsgId = client.guild.resolve(userDbTags.get('serverId'));
//						const channelMsgId = message.serverMsgId.channels.cache.find(channel => channel.name === args[1]).id
//						const tagNumber = userDbTags.get('tagNum');
//						client.channels.get(channelMsgId).send(`<From ${tagNumber}> `);
//				}
//			}
//		}
//
//	}
//}
module.exports = {
	name: 'msg',
	description: 'messaging system',
	execute(message, args, userDbTags, client, Discord, command, prefix) {	
		console.log(args);
		console.log(message.author.tag);
		async function sendMsg() {
			const tagLookFor = await userDbTags.findOne({
				where: {
					username: message.author.username, 
					tagNum: args[0],
					userId: message.author.id
				} 
			});
			console.log(tagLookFor);
			if (tagLookFor === null) {
				message.author.send("This tag doesn't exist!");
			}
			else {
//				const foundGuild = client.guilds.fetch(tagLookFor.serverId);
				console.log(args[1]);
				const contentMessage = message.content.slice(prefix.length + command.length + args[0].length + 3 + args[1].length).split(/ + /);	
				client.guilds.fetch(tagLookFor.serverId)
					.then(guild => {
						const channelId = guild.channels.cache.find(c => c.name === `${args[1]}`).id;
						client.channels.fetch(channelId)
							.then(channel => {
								console.log(channel.guild.me.id);
								
								console.log(channel.hasPermissions('SEND_MESSAGES'));
								if (channel.me.permissions('SEND_MESSAGES')) {
									channel.send(`From <${args[0]}>: ${contentMessage}`);
								}
								else {
									message.reply("Bot doesn't have permissions to send in channels");
								}
								})
								.catch(console.error);
//						if (channelId === undefined) {
//							message.reply("Channel doesn't exist!");
//						}
//						else {
//							guild.channels.cache.get(channelId).send(`From <${args[0]}>: ${contentMessage}`);
//						}
					});

//					.then(guild => = guild.channels.cache.array().filter(c => c.name = `${args[1]}`));
//					(guild.channels.cache.find(c => c.name === `${args[1]}`).id))
//					.then(channel => channel.send(`From <${args0}>: ${args}`));
						//guild.send(`From <${args[0]}>: ${args}`))
//						.then guild.channels.cache.get(c.id).message(`From <${args[0]}>: ${args}`) 
				console.log(client.guilds.fetch(tagLookFor.serverId).cacheType);
			}

		}	
		sendMsg();
	},
}
