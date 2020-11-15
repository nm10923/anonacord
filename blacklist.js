module.exports = {
	name: 'blacklist',
	description: 'blocks tags and every other tag associated with original tag\'s userId',
	execute(message, args, command, userDbTags, serverDbTags) {
		async function functionBlackListUser() {
			const constTagAndServerId = userDbTags.findOne({where: {
				tagNum: args[0],
				serverId: args[1]
			}})
			if (constTagAndServerId === null) {
				message.reply("No tag has corresponding ServerID associated with it!");
			}
			else {
				
			}
			
		}
		if (message.member.hasPermission('ADMINISTRATOR')) {
			functionBlackListUser();
		}
		else {
			message.reply("Only Admins Can Blacklist People From Servers!");
		}

	},


}
