import mongoose from "mongoose";
import fetchingAPI from "../fetchingAPI";


export default  async  (bot,chatID)=>{
    const data = createData();
    sendMessageToUser(chatID, createHTML(data));
};

const createData = async ()=>{
    const dataFromDB = await Money.find({});
    let data = dataFromDB.length===0 ? dataFromDB : dataFromDB[0].rates;
    const dateNaw = new Date();
    const dateUpdate = new Date(dataFromDB[0].time);
    const flagFromDate = dateNaw.getTime() - dateUpdate.getTime();

    if (dataFromDB.length===0 || flagFromDate>36000){
        const dataFetch = await fetchingAPI.listExchangeFetch();
        data = dataFetch;

        mongoose.model('money').update({}, {rates: data, time: new Date()});
        if (dataFromDB.length===0) new Money({rates: data, time: new Date()}).save()
    }
    return data;
};

const createHTML = (data)=>{
    let html = ``;

    for (let key in data){
        html += `<code>
    <s>${key}:</s> <pre>${data[key].toFixed(2)}</pre> 
</code>`;
    }
    return html
};

const sendMessageToUser =(bot,chatId, html)=>{
    const options = {
        parse_mode: 'HTML'
    };

    bot.sendMessage(chatId, html, options);
};