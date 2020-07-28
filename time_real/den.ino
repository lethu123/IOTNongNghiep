void den()
{
  if (temperature < minTemp) {
    digitalWrite(D2, 1);
  }
  else {
    digitalWrite(D2, 0);
  }
  if (autoled == 1) // ở chế độ auto
  {
    if (light == 0) {
      digitalWrite(D3, 0);
    } else {
      digitalWrite(D3, 1);
    }
    Firebase.setInt("light/led_light", light );
  }
  else { // tắt chế độ auto
    digitalWrite(D3, dkled);
    digitalWrite(D3, ledAS);
  }
}
