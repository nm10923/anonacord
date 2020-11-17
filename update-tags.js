module.exports = {
	name: 'update-tags',
	description: 'resets tags',
	execute(message, args, userDbTags, serverDbTags) {
		async function functionUpdateTags() {
			const updateTags = await userDbTags.update( {tagNum: Math.floor(Math.random() * 100000) + 99999 }, { 
				where: {
					username: message.author.username,
					tagNum: args[0],
					userId: message.author.id
				}
			});
			message.author.send(`New Tag Number ${updateTags.tagNum}`);
			if (userDbTags === null) {
				message.author.send("This tag doesn't exist or doesn't belong to you!");
			}
		}
		functionUpdateTags();
	},
}
