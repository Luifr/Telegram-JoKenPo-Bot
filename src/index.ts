import { bot } from './telegramBot';
import { MessageManager } from './messageManager';
import { matchmaker } from './matchMaker';

// Just to ping!
bot.on('message', msg => {

	let messageManager = new MessageManager(msg.chat);
	let error: any;
	let text = msg.text;
	if (!text || text == "" || msg.chat.type != "private")
		return;

	if (/\/?(?:join|find|search|buscar)/.test(text)) {
		error = matchmaker.push(msg.chat);
		if (error instanceof Error)
			messageManager.sendMessage("Voce ja esta buscando");
		else
			messageManager.sendMessage("Buscando partida");

	}

	else if (/\/?(?:leave|sair|exit|stop|quit)/.test(text)) {
		error = matchmaker.leaveQueue(msg.chat)
		if (error instanceof Error)
			messageManager.sendMessage("Voce nao estava buscando uma partida");
		else
			messageManager.sendMessage("Voce nao esta mais buscando uma partida");
	}

	// bot.sendMessage(msg.chat.id, text);
});
