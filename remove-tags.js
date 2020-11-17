module.exports = {
	name: 'remove-tags',
	description: 'removes a tag number',
	execute(message, args, userDbTags) {
		async function functionRemoveTags() {
			const deleteTags = await userDbTags.destroy({ 
				where: {
					username: message.author.username,
					tagNum: args[0],
					userId: message.author.id,
				}
			});
		}
		functionRemoveTags();
	},
}
