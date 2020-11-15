module.exports = {
	name: "init2",
	description: "Creates tags and puts user in DB",
	execute(message, args, serverDbTags, userDbTags) {
		async function functionUserDbCreate() {
			try {
				const [tag, created] = await userDbTags.findOrCreate({ where:  {
					username: message.author.username,
					serverId: args[0],
					userId: message.author.id
				},
					defaults: {
					username: message.author.username,
					tagNum: Math.floor(Math.random() * 100000) + 99999,
					serverId: args[0],
					userId: message.author.id
				}});
				if (tag) {
					message.reply(`You already have a tag for this server! ${tag.tagNum}`);
				}
				else {
					message.reply(`Username: ${tag.username}\n Tag number: ${tag.tagNum}\n Server ID: ${tag.serverId}\n User ID: ${tag.userId}`);	
				}
//				return message.reply(`Username: ${tag.username}\n Tag number: ${tag.tagNum}\n Server ID: ${tag.serverId}\n User ID: ${tag.userId}`);	
			} catch (e) {
				if (e.name === 'SequelizeUniqueConstraintError') {
					return message.reply("You already have a tag for the server with the server ID you inputted!");
				}

			}
				return message.reply("ERROR: Something went wrong!")
		}
//				return message.reply("ERROR: Something went wrong!");
		async function functionServerFind(inputServerId){
			const serverFind = await serverDbTags.findOne({ where: {serverId: args[0]} });
			console.log(serverFind);
			if (serverFind === null) {
				message.reply("ERROR: Something happened");
			}
			else {
				functionUserDbCreate();
			}
		}
//		functionServerFind().then(
//			function(value) {functionUserDbCreate();},
//			function(error) {console.log("ERROR: Something happened");}
//		);
		if (args[0] === undefined) {
			message.reply("testing");
		}
		else {
			functionServerFind();
		}
//			if (serverFind === null) {
//				message.reply("ERROR: Couldn't find server with inputted server ID in the server database!");
//			}
//			else {
//				try {
//					async function functionUserDbCreate() {
//						const tag = await userDbTags.create({
//							username: message.author.username,
//							tagNum: Math.floor(Math.random() * 100000) + 99999,
//							serverId: args[0],
//						});
//					return reply.message(`Username: ${tag.username}\n Tag number: ${tag.tagNum}\n Server ID: ${tag.serverId}`);
//					}
//				} catch (e) {
//					if (e.name === 'SequelizeUniqueConstraintError') {
//						return reply.message("You already have a tag for the server with the server ID you inputted!");
//					}
//
//				}
//				return message.reply("ERROR: Something went wrong!");
//
//			}
//		}	
	},
}
