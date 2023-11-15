import telebot
import json
import rapidfuzz

bot = telebot.TeleBot("BOT_TOKEN")

dialogs = []
messages = {}
for i in range(1, 21):
  with open(f"train_{i}.json", "r") as file:
    object1 = json.loads(file.read())
    dialogs+=object1

for i in range(len(dialogs)):
    for message in dialogs[i]["dialogue"]:
        messages[message["message"]] = i

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
	bot.reply_to(message, "Привет!")

@bot.message_handler(func=lambda message: True)
def text(message):
    compairing = rapidfuzz.process.extract(message.text, messages.keys())
    print(compairing)
    list1 = []
    final_message = None
    for i in compairing:
        dialogue = dialogs[messages[i[0]]]
        count = 0
        ok = True
        for j in dialogue["dialogue"]:
            if not ok:
                break
            if j["message"] == i[0]:
                a = count+1
                while a < len(dialogue["dialogue"]):
                    if dialogue["dialogue"][a]["user_id"] == 1:
                        final_message = dialogue["dialogue"][a]["message"]
                        ok = False
                        break
                    a+=1
            count+=1
        break
    bot.send_message(message.chat.id, final_message)

bot.infinity_polling()
