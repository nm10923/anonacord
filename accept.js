module.exports = {
	name: 'accept',
	description: 'puts serverID into serverDb',
	execute(message, args, serverDbTags) {
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
	},
}
