import fetch from "node-fetch";
import fetchingAPI from "../fetchingAPI";

export default  async (bot,chatId, match)=>{
    const money = await exchangeMoney(match);
    bot.sendMessage(chatId, `$${money}`);
};

const exchangeMoney = async (match)=>{
    let money;
    let base;
    let symbol;
    if (match[0]==='$') {
        base = 'USD';
        [money, ,symbol] = match.split(' ');
        money = money.split('').slice(1).join('');
    } else {
        [money, base, , symbol] = match.split(' ');
    }
    const result = await fetchingAPI.exchengeMoneyFetch(symbol, base);
    return (money*result.rates[symbol]).toFixed(2);
};