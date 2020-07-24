module.exports = {
    name: 'prune',
    description: 'Deletes a certain amount of messages',
    guildOnly: true,
    cooldown: 5,
    execute(message, args) {
        // add a +1 because that accounts for the actual prune command that you type.
    const num = parseInt(args[0]) + 1;
    if (isNaN(num)) {
        return message.reply(`That is not a valid number, enter a number between 1 and 99.`);
    } else if (num <= 1 || num > 99) {
        return message.reply(`Please enter a number between 1 and 99.`);
    }
    message.channel.bulkDelete(num)
        .then(console.log(`Bulk deleted ${num} messages`))
        .catch(error => {
        console.error(error)
        message.channel.send('There was an error when trying to prune messages in this channel')
        });
    }
};
