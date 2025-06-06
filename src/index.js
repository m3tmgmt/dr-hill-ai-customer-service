import dotenv from 'dotenv';

// Загрузка переменных окружения
dotenv.config();

class DrHillCustomerServiceApp {
  constructor() {
    this.isRunning = false;
  }

  validateEnvironment() {
    const requiredVars = [
      'BOT_TOKEN',
      'ALTEGIO_PARTNER_ID', 
      'ADMIN_TELEGRAM'
    ];

    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    console.log('✅ Environment variables validated');
  }

  async start() {
    try {
      console.log('🚀 Starting Dr. Hill Customer Service Agent...');
      
      this.validateEnvironment();
      
      console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║  🤖 Dr. Hill Customer Service Agent активен!                ║
║                                                              ║  
║  📱 Telegram Bot: @DoctorHillBot                           ║
║  👩‍⚕️ AI Assistant: Мария                                    ║
║  🏥 Сеть: Dr. Hill (5 філіалів)                            ║
║                                                              ║
║  Система готова обслуживати клієнтів 24/7                   ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
      `);

      this.isRunning = true;
      
    } catch (error) {
      console.error('❌ Failed to start application:', error);
      throw error;
    }
  }
}

// Функция запуска приложения
async function main() {
  try {
    const app = new DrHillCustomerServiceApp();
    await app.start();
    
  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  }
}

// Запускаем приложение только если этот файл выполняется напрямую
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default DrHillCustomerServiceApp;