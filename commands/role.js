module.exports = {
    name: 'role',
    description: 'Assigns roles to user',
    args: true,
    cooldown: 5,
    execute(message, args) {
        const role = message.guild.roles.cache.find(role => role.name === args[0]);
        const target = message.mentions.members.first();

    if (target) {
        target.roles.add(role);
        message.reply(`The **${args[0]}** role has been given to ${target}`);
    } else if (role) {
            message.member.roles.add(role);
            message.reply(`The **${args[0]}** role has been given to you.`)
        } else {
            message.reply(`No such role exists, if you would like to create a ${args[0]} role, use the ***** command`);
        }
    },
};
