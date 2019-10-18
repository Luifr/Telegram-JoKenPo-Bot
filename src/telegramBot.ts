//@ts-ignore
process.env.NTBA_FIX_319 = 1;

import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import fs from 'fs';

let botOptions: any = {};
const TOKEN = process.env.TELEGRAM_TOKEN || fs.readFileSync('botKey').toString();
const port = process.env.PORT;

export let bot: TelegramBot;

if (process.env.NODE_ENV == "production") {
	bot = new TelegramBot(TOKEN, botOptions);

	const url = 'https://<PUBLIC-URL>'; // TODO
	bot.setWebHook(`${url}/bot${TOKEN}`);

	const app = express();

	app.use(express.urlencoded({ extended: false }));

	app.post(`/bot${TOKEN}`, (req, res) => {
		bot.processUpdate(req.body);
		res.sendStatus(200);
	});

	app.listen(port, () => {
		console.log(`Express server is listening on ${port}`);
	});

}
else {
	botOptions.polling = true;
	bot = new TelegramBot(TOKEN, botOptions);
}