import { bot } from './telegramBot';

export class MessageManager {

	id: number;

	constructor(id: number) {
		this.id = id;
	}

	sendMessage(text: string) {
		bot.sendMessage(this.id, text);
	}
}