const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.")
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });

});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`);
    bot.user.setActivity("a test", {type: "PLAYING"});
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = "~";
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

//episode 8 describes a possibly unconventional warning system, didn't test it because i dont want to ban anyone
//episode 7 describes the addrole and removerole commands
//episode 6 describe the tempmute command that mutes a user temporarily, not the best idea for a bot but includes a timer, requires "npm install ms -s"
//episode 5 goes over how to seperate commands into other folders
//skipped episode 4, banning and kicking through a bot is a terrible idea, also pretty similar to episode 3
//episode 3 describes the report command that allows a user to report another
//episode 2 describes the botinfo and serverinfo commands that describe the bot and server respectively
})

bot.login(process.env.TOKEN)