//tg bot v2
//При нажатии на "start" приветствует и выводит кнопку
//Создает запись в бд с chatId пользователя
//А также с полями типа lastname и firstname при наличии

const tgBot = require("node-telegram-bot-api");
const UserModel = require("./models");
const sequelize = require("./db");

const token = "7074926259:AAH3uW4oybN23rQt_eD9pCqGdapqWz3qtYI";

const bot = new tgBot(token, { polling: true });

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (e) {
    console.log("Подключение к бд сломалось", e);
  }
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    try {
      if (text === "/start") {
        await UserModel.create({ chatId });
      }
    } catch (e) {
      console.log("Ошибка при старте", e);
    }
  });

  // Команда /start
  bot.onText(/\/start/, async (msg) => {
    console.log("Received /start command:", msg); // Выводим сообщение в консоль

    const chatId = msg.chat.id;
    const firstName = msg.from.first_name || "";
    const lastName = msg.from.last_name || "";
    const username = msg.from.username || "";

    let avatarUrl = "";

    // Получение аватарки пользователя
    try {
      const user = await UserModel.findOne({ chatId });
      user.firstname = firstName;
      user.lastname = lastName;
      user.username = username;
      const profilePhotos = await bot.getUserProfilePhotos(msg.from.id);
      console.log("Game file:", profilePhotos.total_count);
      if (profilePhotos.total_count > 0) {
        const photoId = profilePhotos.photos[0][0].file_id; // Берем первое фото
        const file = await bot.getFile(photoId);
        avatarUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
        user.avatar = avatarUrl;
      }

      await user.save();
    } catch (error) {
      console.error("Error getting user profile photos:", error);
    }

    // Формируем URL с параметрами пользователя
    const gameUrl = `https://daniel-jacky.github.io/DriveProject/#/?chatId=${chatId}&firstName=${encodeURIComponent(
      firstName
    )}&username=${encodeURIComponent(username)}&avatarUrl=${encodeURIComponent(
      avatarUrl
    )}`;

    console.log("Game URL:", gameUrl); // Для отладки

    // Отправляем сообщение с кнопкой для запуска игры
    bot.sendMessage(chatId, "Запустить игру", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Играть!",
              web_app: { url: gameUrl },
            },
          ],
        ],
      },
    });
  });
};

start();
