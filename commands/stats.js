const { version } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

exports.run = (client, message) => {
  const duration = moment
    .duration(client.uptime)
    .format(' D [days], H [hrs], m [mins], s [secs]');
  message.channel.send(
    `= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.users.size.toLocaleString()}
• Servers    :: ${client.guilds.size.toLocaleString()}
• Channels   :: ${client.channels.size.toLocaleString()}
• Discord.js :: v${version}
• Node       :: ${process.version}`,
    { code: 'asciidoc' },
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'stats',
  category: 'Sistema',
  description: 'Dá algumas informações úteis sobre o bot.',
  usage: 'stats',
};
