const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!rMember) return message.channel.send("Couldn't find user.");
        let role = args.join (" ").slice(22);

    if(!role) return message.reply("Specify a role!");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("Couldn't find that role.")

    if(rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
    await(rMember.addRole(gRole.id));

    try{
        await rMember.send(`Congrats, you have been given the role ${gRole.name}.`)
    }catch(e){
    message.channel.send(`Congrats to <@${rMember.id}, you have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`)
    }
}

module.exports.help = {
    name: "addrole"
}