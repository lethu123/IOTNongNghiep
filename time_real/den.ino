  void den()
{
  if (autoled == 1) // ở chế độ auto
  {
    if (AnalogValue < threshold1) {             // Nếu giá trị analog < 650 thì đèn tắt
      if (led3 != 0 or led4 != 0) {
        Serial.println("led green + white is turn off ");
        digitalWrite(D0, 0);
        digitalWrite(D1, 0);
        Firebase.setInt("setControl/led_light_green", 0 );
        Firebase.setInt("setControl/led_light_white", 0 );
        led3 = 0; led4 = 0;
      }
    } else if (  AnalogValue > threshold1 and AnalogValue < avgThreshold) {
      if (led3 != 0 or led4 != 1) {
        Serial.println("led white is turn off ");
        digitalWrite(D0, 0);
        digitalWrite(D1, 1);
        Firebase.setInt("setControl/led_light_green", 1 );
        Firebase.setInt("setControl/led_light_white", 0 );
        led3 = 0; led4 = 1;
      }
    } else if (  AnalogValue > avgThreshold and AnalogValue < threshold2) {
      if (led3 != 1 or led4 != 0) {
        Serial.println("led green is turn off ");
        digitalWrite(D0, 1);
        digitalWrite(D1, 0);
        Firebase.setInt("setControl/led_light_green", 0 );
        Firebase.setInt("setControl/led_light_white", 1 );
        led3 = 1; led4 = 0;
      }
    } else {
      if (led3 != 1 or led4 != 1) {
        Serial.println("two led is turn on ");
        digitalWrite(D0, 1);
        digitalWrite(D1, 1);
        Firebase.setInt("setControl/led_light_green", 1);
        Firebase.setInt("setControl/led_light_white", 1 );
        led3 = 1; led4 = 1;
      }
    }
    delay(100);


    if (temperature < minTemp ) {
      if (led1 != 1 or led2 != 1)
      {
        digitalWrite(D4, 1);//led 1
        digitalWrite(D3, 1);//led 2
        Firebase.setInt("setControl/led_temp_red", 1 );
        Firebase.setInt("setControl/led_temp_blue", 1 );
        Serial.println("min");
        led1 = 1; led2 = 1;
      }
    }
    else if (temperature > minTemp and temperature < avgTemp ) {
      if (led1 != 1 or led2 != 0)
      {
        digitalWrite(D4, 1); // red
        digitalWrite(D2, 0); // blue
        Firebase.setInt("setControl/led_temp_red", 1 );
        Firebase.setInt("setControl/led_temp_blue", 0 );
        Serial.println("TB");
        led1 = 1; led2 = 0;
      }
    }
    else if (temperature > avgTemp and temperature < maxTemp ) {
      if (led1 != 0 or led2 != 1)
      {
        digitalWrite(D4, 0); // red
        digitalWrite(D2, 1); // blue
        Firebase.setInt("setControl/led_temp_red", 0 );
        Firebase.setInt("setControl/led_temp_blue", 1 );
        Serial.println("max");
        led1 = 0; led2 = 1;
      }
    } else {
      if (led1 != 0 or led2 != 0)
      { //cau lenh nay se chi chay 1 lan roi thoi de tranh lap lai cau lenh 1 cach vo ich
        // khi đk này thoa man
        digitalWrite(D4, 0); // red
        digitalWrite(D2, 0); // blue
        Firebase.setInt("setControl/led_temp_red", 0 );// no cu set lien tuc
        Firebase.setInt("setControl/led_temp_blue", 0 );// set lien tuc mac du du lieu tren fire base da = 0 roi, de toi uu hoa va de tranh gap loi nen them dk vao cau lenh if, nhu the nay
        Serial.println("else");
        led1 = 0; led2 = 0;
      }
    }
  }
  else { // tắt chế độ auto
    digitalWrite(D0, ledWhite);
    digitalWrite(D1, ledGreen);
    digitalWrite(D4, ledRed);
    digitalWrite(D2, ledBlue);
  }
}
