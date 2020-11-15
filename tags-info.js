module.exports = {
	name: 'tags-info',
	description: 'let user view all their tags',
	execute(message, args, command, userDbTags, serverDbTags, client) {	
		async function functionFindTagsWithServerAndUserId() {
			const constWaitForTags = await userDbTags.findAll({ where: {
				userId: message.author.id,
			}});
			if (constWaitForTags === null) {
				message.reply("You don't have any Anonycord tags!");
			}
			else {
				console.log(`Tags: ${constWaitForTags}.`);
			}
		}
		async function functionGetTagInfo() {
			const constFetchTags = await userDbTags.findOne({ where: {
				tagNum: args[0],
				userId: message.author.id,
			}})
			if (constFetchTags === null) {
				message.reply("This tag is not on our databases!");
			}
			else {
				client.guilds.fetch(constFetchTags.serverId)
					.then(guild => {
						message.reply(`Tag: ${constFetchTags.tagNum}\nServer Name: ${guild.name}`);
					});
			}

		}
		if (args[0] === undefined) {
			functionFindTagsWithServerAndUserId();
		}
		else {
			functionGetTagInfo();
		}
	},

}
