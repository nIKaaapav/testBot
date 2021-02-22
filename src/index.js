import  TelegramBot from "node-telegram-bot-api";
import fetch from 'node-fetch';
import {ChartJSNodeCanvas} from 'chartjs-node-canvas';
import config from "./config";
import loader from './loader';
import list from './list';
import exchenge from './exchenge';
import history from './history';

const bot = new TelegramBot(config.TOKEN_BOT,  {polling: true});

loader();


bot.onText(/\/list/, async msg =>{
    list(bot,msg.chat.id)
});

bot.onText(/\/exchange (.+)/,  (msg, [source, match]) =>{
    exchenge(bot, msg.chat.id, match)
});



bot.onText(/\/history/,  (msg, [source, match]) =>{
    history(bot,msg.chat.id, match)
});

