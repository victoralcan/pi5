exports.run = async (client, message, args) => {
  if (!args || args.length < 5) {
    return message.reply('Isso é tudo sua culpa! Muitos parâmetros!');
  }

  if (args[1] !== 'in' || !/\d+[hms]/.test(args[2]) || args[3] !== 'to') {
    return message.reply('Isso é tudo sua culpa: Erro de Sintaxe!');
  }

  const member = message.mentions.members.first();
  const unit = args[2].replace(/\d*/, '');
  let delay = parseInt(args[2].replace(/\D/, ''), 10);
  const remember = args.slice(4).join(' ');

  if (unit === 'm') delay *= 60;
  else if (unit === 'h') delay *= 3600;

  setTimeout(
    (msg, mention, note) => msg.channel.send(`<@${mention.user.id}>, remember to ${note}!`),
    delay * 1000,
    message,
    member,
    remember,
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Developer',
};

exports.help = {
  name: 'remember',
  category: 'Diversos',
  description: 'Lembre-se de uma notificação agendada.',
  usage: 'remember [Pessoa a ser mencionada] in [Tempo][h|m|s] to [mensagem]',
};
