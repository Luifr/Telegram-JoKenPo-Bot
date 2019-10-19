import { FifoMatchmaker } from 'matchmaking';
import { runGame } from './gameManager';

function getKey(player: any) {
	return player.username || player.first_name || player.id.toString();
}

export let matchmaker = new FifoMatchmaker(runGame, getKey);