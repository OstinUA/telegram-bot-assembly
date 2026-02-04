function sendTelegramMessage() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var token = "YOUR_BOTT_TOKEN";
  var chatId = "YOUR_CHAT_ID";

  var data = sheet.getRange("A1").getValue();

  var url = "https://api.telegram.org/bot" + token + "/sendMessage";
  var payload = {
    "chat_id": chatId,
    "text": data
  };

  UrlFetchApp.fetch(url, {
    "method": "post",
    "payload": payload
  });
}
