void time_r()
{
  formattedDate = timeClient.getFormattedDate();
  int splitT = formattedDate.indexOf("T");
  dayStamp = formattedDate.substring(0, splitT);
  timeStamp = formattedDate.substring(splitT + 1, formattedDate.length() - 1);
  
  Serial.print(dayStamp);
  Serial.print("  ");
  Serial.print(timeStamp);
  Serial.print(": ");
}
