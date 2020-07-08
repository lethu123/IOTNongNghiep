void nhietdo()
{
  delay(dht.getMinimumSamplingPeriod());
  temperature = dht.getTemperature();
  Serial.print(temperature, 1);
  Serial.println("*C");

}

