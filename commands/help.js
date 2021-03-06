exports.run = (client, message, args, level) => {
  if (args[0]) {
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      if (level < client.levelCache[command.conf.permLevel]) return;
      message.channel.send(
        `= ${command.help.name} = \n${command.help.description}\n\nComo Usar:: ${
          command.help.usage
        }\n= ${
          command.help.name
        } =`,
        { code: 'asciidoc' },
      );
    }
  } else {
    const myCommands = message.guild
      ? client.commands.filter(
        (cmd) => client.levelCache[cmd.conf.permLevel] <= level,
      )
      : client.commands.filter(
        (cmd) => client.levelCache[cmd.conf.permLevel] <= level
            && cmd.conf.guildOnly !== true,
      );

    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce(
      (long, str) => Math.max(long, str.length),
      0,
    );

    let currentCategory = '';
    let output = `= Command List =\n\n[Use ${message.settings.prefix}help <comando> para mais detalhes acerca de um comando específico]\n`;
    const sorted = myCommands
      .array()
      .sort((p, c) => (p.help.category > c.help.category
        ? 1
        : p.help.name > c.help.name && p.help.category === c.help.category
          ? 1
          : -1));
    sorted.forEach((c) => {
      const cat = c.help.category.toProperCase();
      if (currentCategory !== cat) {
        output += `\u200b\n== ${cat} ==\n`;
        currentCategory = cat;
      }

      output += `${message.settings.prefix}${c.help.name}${' '.repeat(
        longest - c.help.name.length,
      )} :: ${c.help.description}\n`;
    });
    message.channel.send(output, {
      code: 'asciidoc',
      split: { char: '\u200b' },
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'f1'],
  permLevel: 'User',
};

exports.help = {
  name: 'help',
  category: 'Sistema',
  description: 'Mostra todos os comandos disponíveis para seu nível de permissão.',
  usage: 'help [comando]',
};
