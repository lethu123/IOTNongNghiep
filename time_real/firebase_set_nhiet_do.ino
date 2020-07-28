void fire_set() {
  if (Firebase.available()) {
    FirebaseObject fi = Firebase.readEvent();
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
    else if (fi.getString("path") ==  "/control") {

      dkled = fi.getInt("data");
      Serial.println("controlLed : " + String(dkled));
    }
  }
}
