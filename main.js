
import TelegramBot from 'node-telegram-bot-api'; 
import getTokenDetails from './src/lib/checkall.js';

var token = "6186706488:AAEOszfddBTJFHFD3ARt0WSOtwkHIh59ywg"

var bot = new TelegramBot(token, { polling: true });
  
bot.on("polling_error", (err) => console.log(err));
bot.on("error", (err) => console.log(err));
  

bot.onText(/\/start/, function (msg, match) {
    var chatId = msg.chat.id 
    const response = `✅<b>CoinaLyzer Token Scanner</b>✅
    <i>Enter /info tokenaddress  to display the token statistics</i>`
    bot.sendMessage(chatId,response,{parse_mode : "HTML"});

});

bot.onText(/\/help/, function (msg, match) {
    var chatId = msg.chat.id 
    const response = `✅<b>CoinaLyzer Token Scanner</b>✅
    <i>Enter /info tokenaddress  to display the token statistics</i>`
    bot.sendMessage(chatId,response,{parse_mode : "HTML"});

});

bot.onText(/\/info (.+)/, function (msg, match) {
    var chatId = msg.chat.id
    var tokenAddress = match[1];
    getTokenDetails(tokenAddress).then((res)=>{ 
        const data = res; 
        console.log(data); 
        if(data.status===0)
            bot.sendMessage(chatId,data.mesg);
        else {
            const msg = `✅<b>CoinaLyzer Token Scanner</b>✅
            <i>Do your own due dilligence before investing</i> 
            <b>Token Name:</b> ${data.name}
            <b>Token Symbol:</b> ${data.symbol}
            <b>Token Network:</b> ${data.network}
            <b>Last Hour Volume:</b> ${data.h1}
            <b>Token Liquidity:</b> ${data.liquidity}
            <b>Token Price (usd):</b> ${data.priceUsd}
            <b>Created At:</b> ${data.pairCreatedAt}
            <b>HoneyPot Check:</b> ${data.isHoneyPot}
            <b>Blacklist Check:</b> ${data.blacklisted}
            <b>Source code Verified:</b> ${data.verified} 
            <b>Buy Tax:</b> ${data.buyTax}%
            <b>Sell Tax:</b> ${data.sellTax}%`
            bot.sendMessage(chatId,msg,{parse_mode : "HTML"});
        }
    })
     



})
