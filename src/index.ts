import { bot } from './telegramBot';
import { MessageManager } from './messageManager';
import { matchmaker } from './gameManager';

import * as Constants from './constants';
import { IPlayerState } from './src/matchMaker';


bot.onText(/\/?(?:join|find|search|buscar)/i, msg => {

	let messageManager = new MessageManager(msg.chat);
	let error: any;
	// let text = (msg.text as string).toLowerCase().trim();
	if (msg.chat.type != "private")
		return;

	error = matchmaker.push(msg.chat);
	if (error instanceof Error)
		messageManager.sendMessage("Voce ja esta buscando");
	else
		messageManager.sendMessage("Buscando partida");


});

bot.onText(/\/?(?:leave|sair|exit|stop|quit)/i, msg => {

	let messageManager = new MessageManager(msg.chat);
	let error: any;
	// let text = (msg.text as string).toLowerCase().trim();

	error = matchmaker.leaveQueue(msg.chat);
	if (error instanceof Error)
		messageManager.sendMessage("Voce nao estava buscando uma partida");
	else
		messageManager.sendMessage("Voce nao esta mais buscando uma partida");
});

bot.onText(new RegExp(`\/?(?:${Constants.rock}|${Constants.paper}|${Constants.scissor})`, 'i'), (msg) => {
	if (matchmaker.getPlayerState(msg.chat) == IPlayerState.PLAYING) {
		bot.sendMessage(msg.chat.id, 'asd');
	}
})