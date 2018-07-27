const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!rMember) return message.channel.send("Couldn't find user.");
        let role = args.join (" ").slice(22);

    if(!role) return message.reply("Specify a role!");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("Couldn't find that role.")

    if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role.");
    await(rMember.removeRole(gRole.id));

    try{
        await rMember.send(`You no longer have the ${gRole.name} role.`)
    }catch(e){
    message.channel.send(`<@${rMember.id}, you no longer have the ${gRole.name} role. We tried to DM them, but their DMs are locked.`)
    }
}

module.exports.help = {
    name: "removerole"
}