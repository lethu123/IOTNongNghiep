void fire_set() {
  if (Firebase.available()) {
    FirebaseObject fi = Firebase.readEvent();
    Serial.println("co thay doi path: " + fi.getString("path") + " , method: " + fi.getString("type") + " , data: " + fi.getInt("data"));
    if (fi.getString("path") ==  "/min") {
      minTemp = fi.getFloat("data");
      Serial.println("minTemp: " + String(minTemp));
    }
    else if (fi.getString("path") ==  "/max") {
      maxTemp = fi.getFloat("data");
      Serial.println("maxTemp: " + String(maxTemp));
    }
    else if (fi.getString("path") ==  "/auto") {
      autoled = fi.getInt("data");
      Serial.println("auto : " + String(autoled));
    }
    else if (fi.getString("path") ==  "/avg") {
      avgTemp = fi.getInt("data");
      Serial.println("avgTemp: " + String(avgTemp));
    }
    else if (fi.getString("path") ==  "/led_light_white") {
      ledWhite = fi.getInt("data");
      Serial.println("ledWhite: " + String(ledWhite));
    }
    else if (fi.getString("path") ==  "/led_light_green") {
      ledGreen = fi.getInt("data");
      Serial.println("ledGreen: " + String(ledGreen));
    }
    else if (fi.getString("path") ==  "/led_temp_red") {
      ledRed = fi.getInt("data");
      Serial.println("ledRe : " + String(ledRed));
    }
    else if (fi.getString("path") ==  "/led_temp_blue") {
      ledBlue = fi.getInt("data");
      Serial.println("ledBlue : " + String(ledBlue));
    }
    else
    {
      if (maxTemp != Firebase.getFloat("setControl/max")) {
        maxTemp = Firebase.getFloat("setControl/max");
        Serial.println("maxTemp: " + String(maxTemp));
      }
      if (minTemp != Firebase.getFloat("setControl/min")) {
        minTemp = Firebase.getFloat("setControl/min");
        Serial.println("minTemp: " + String(minTemp));
      }
      if (avgTemp != Firebase.getInt("setControl/avg")) {
        avgTemp = Firebase.getInt("setControl/avg");
        Serial.println("avgTemp: " + String(avgTemp));
      }
      if ( autoled != Firebase.getInt("setControl/auto")) {
        autoled = Firebase.getInt("setControl/auto");
        Serial.println("auto : " + String(autoled));
      }
      else if (ledWhite != Firebase.getInt("setControl/led_light_white")) {
        ledWhite = Firebase.getInt("setControl/led_light_white");
        Serial.println("ledWhite: " + String(ledWhite));
      }
      else if (ledGreen != Firebase.getInt("setControl/led_light_green")) {
        ledGreen = Firebase.getInt("setControl/led_light_green");
        Serial.println("ledGreen: " + String(ledGreen));
      }
      else if (ledRed != Firebase.getInt("setControl/led_temp_red")) {
        ledRed = Firebase.getInt("setControl/led_temp_red");
        Serial.println("ledRe : " + String(ledRed));
      }
      else if (ledBlue != Firebase.getInt("setControl/led_temp_blue")) {
        ledBlue = Firebase.getInt("setControl/led_temp_blue");
        Serial.println("ledBlue : " + String(ledBlue));
      }
    }
  }
}
