void den()
{
  if(temperature < minTemp) {
    digitalWrite(D2, 1);
  }
  else {
    digitalWrite(D2, 0);
  }
if (autoled == 1)
{
  if(light == 0) {
    digitalWrite(D3, 0);
  } else {
    digitalWrite(D3, 1);
  }
}
else digitalWrite(D3, dkled);
}
