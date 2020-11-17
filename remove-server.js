module.exports = {
	name: 'server-remove',
	description: 'removes any trace of the server from the databases',
	execute(message, args, userDbTags, serverDbTags){
		async function functionDeleteServer() {
			if (message.member.hasPermission('ADMINISTRATOR')) {
				const destroyServerId = await serverDbTags.destroy({
					where:{
						serverId: message.guild.id
					}
				});
				const destroyUserTagsWithServerId = await userDbTags.destroy({
					where: {
						serverId: message.guild.id
					}
				)};
			}
		}
		if (message.guild.id === undefined) {
			message.reply("You're not in a server!");
		}
		else {
			functionDeleteServer();
		}
	},
}
