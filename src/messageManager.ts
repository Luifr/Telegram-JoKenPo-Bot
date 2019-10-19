import { bot } from './telegramBot';
import { Player } from './gameManager';

function getKey(player: Player) {
	return player.username || player.first_name || player.id.toString();
}

export class MessageManager {

	p: Player;
	p2?: Player;

	constructor(p: Player, p2?: Player) {
		this.p = p;
		this.p2 = p2;
	}

	sendMessage(text: string) {
		bot.sendMessage(this.p.id, text);
	}

	sendGameStart() {
		if (this.p2) {
			bot.sendMessage(this.p.id, `Oponente encontrado: ${getKey(this.p2)}`);
			bot.sendMessage(this.p2.id, `Oponente encontrado: ${getKey(this.p)}`);
		}
	}

}