import {ChartJSNodeCanvas} from "chartjs-node-canvas";
import fetchingAPI from "../fetchingAPI";

export  default async (bot, chatId, match)=>{
    const historyGraf = await getHistory(match);
    bot.sendPhoto(chatId, money, historyGraf);
};

const  getDateAgo = (date, days) =>{
    let dateCopy = new Date(date);

    dateCopy.setDate(date.getDate() - days);
    return dateCopy.getDate();
};

const getHistory = async (match)=>{
    const [a,,dayNum] = match.split(' ');
    const[base, symbols] = a.split('/');

    const dayNow = new Date();

    const result = fetchingAPI.historyFetch(dayNow, getDateAgo(dayNum), base,symbols);
    if (!result) return 'No exchange rate data is available for the selected currency';

    const graf = grafic(result);
    return graf;
};

const getDataForStatistic =()=>{
    const labels = [];
    const data = [];
    let i =0;
    for (let key in result.rates){
        labels[i++]=key;
        data[i++]=result.rates[key];
    }

    return {
        labels,
        data
    }
};



const grafic = async (fetchData)=>{
    const width = 400;
    const height = 400;

    const {labels, data} = getDataForStatistic(fetchData);
    const chartCallback = (ChartJS) => {
        ChartJS.defaults.global.elements.rectangle.borderWidth = 2;
    };
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });
    const configuration = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Votes',
                data: data,
            }]
        },
        options: {
        }
    };
    const image = await chartJSNodeCanvas.renderToBuffer(configuration);
    const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);
    const stream = chartJSNodeCanvas.renderToStream(configuration);
    return image;
};


