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
					});
				console.log(client.guilds.fetch(tagLookFor.serverId).cacheType);
			}

		}	
		sendMsg();
	},
}
