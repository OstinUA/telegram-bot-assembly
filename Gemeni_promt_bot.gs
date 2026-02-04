const GEMINI_API_KEY = 'API'; 
const TELEGRAM_TOKEN = 'API'; 
const CHAT_ID = 'API'; 

function generateAndSend() {
  const prompt = "PROMT";
  
  const modelName = "gemini-2.5-flash-lite"; 
  const aiUrl = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
  
  const aiPayload = {
    "contents": [{
      "parts": [{ "text": prompt }]
    }]
  };
  
  try {
    Logger.log(`Запрос к ${modelName}...`);
    const aiResponse = UrlFetchApp.fetch(aiUrl, {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify(aiPayload),
      "muteHttpExceptions": true 
    });

    const json = JSON.parse(aiResponse.getContentText());
    if (json.error) {
      Logger.log("Ошибка API: " + json.error.message);
      return;
    }

    let tarotText = json.candidates[0].content.parts[0].text;
    
    tarotText = tarotText.replace(/[#*`]/g, ""); 

    if (tarotText.length > 4000) {
      tarotText = tarotText.substring(0, 3990) + "...";
    }

    const tgUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    const tgResponse = UrlFetchApp.fetch(tgUrl, {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify({
        "chat_id": CHAT_ID,
        "text": tarotText
      }),
      "muteHttpExceptions": true
    });

    const tgJson = JSON.parse(tgResponse.getContentText());
    if (tgJson.ok) {
      Logger.log("Готово! Чистый текст отправлен.");
    } else {
      Logger.log("Ошибка Telegram: " + tgJson.description);
    }

  } catch (e) {
    Logger.log("Критическая ошибка: " + e.toString());
  }
}
