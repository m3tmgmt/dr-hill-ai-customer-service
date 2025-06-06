import { createServer } from 'http';
import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

// Простой обработчик сообщений
bot.start((ctx) => {
  ctx.reply(`🤖 Привіт! Я Марія - асистентка Dr. Hill.

📱 Бот: @DoctorHillBot
👩‍⚕️ Система готова до роботи!

Напишіть що вас турбує, і я допоможу підібрати найкращий масаж.`);
});

bot.on('text', (ctx) => {
  const message = ctx.message.text.toLowerCase();
  
  if (message.includes('масаж') || message.includes('біль') || message.includes('болить')) {
    ctx.reply(`Розумію ваш запит про масаж. 

🏥 Dr. Hill - мережа студій лікувального масажу
📍 5 філіалів: Київ, Дніпро (2), Кам'янське (2)

💰 Ціни:
• Київ/Дніпро: 30хв - 500грн, 50хв - 850грн  
• Кам'янське: 55хв - 500грн, 90хв - 750грн
• 🎁 Новим клієнтам - 50% знижка

📞 Для запису: @matmasss
📱 Телефон: +380990007099`);
  } else {
    ctx.reply(`Дякую за повідомлення! 

Я можу допомогти з:
• 📅 Записом на масаж
• 💰 Інформацією про ціни
• 📍 Вибором філіалу
• 👨‍⚕️ Підбором спеціаліста

Для детальної консультації: @matmasss`);
  }
});

// Створюємо HTTP сервер
const server = createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const update = JSON.parse(body);
        await bot.handleUpdate(update);
        res.writeHead(200);
        res.end('OK');
      } catch (error) {
        console.error('Webhook error:', error);
        res.writeHead(500);
        res.end('Error');
      }
    });
  } else if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      bot: '@DoctorHillBot',
      timestamp: new Date().toISOString()
    }));
  } else if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
<!DOCTYPE html>
<html>
<head><title>Dr. Hill Bot</title><meta charset="utf-8"></head>
<body>
  <h1>🤖 Dr. Hill Customer Service Bot</h1>
  <p><strong>Bot:</strong> @DoctorHillBot</p>
  <p><strong>Status:</strong> Active</p>
  <p><strong>Admin:</strong> @matmasss</p>
</body>
</html>`);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`🚀 Dr. Hill Bot running on port ${port}`);
  console.log(`📱 Bot: @DoctorHillBot`);
  console.log(`🌐 Webhook: /webhook`);
});

export default server;