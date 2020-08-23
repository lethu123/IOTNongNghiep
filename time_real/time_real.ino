#include <ESP8266WiFi.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <FirebaseArduino.h>
#include <Arduino.h>
#include <ArduinoJson.h>
#include "DHTesp.h"
DHTesp dht;
#define pinAnaLight  A0    // Chân kết nối với A0 của cảm biến ánh sáng
#define threshold1    400   // Ngưỡng so sánh.
#define threshold2    900   // Ngưỡng so sánh.
#define avgThreshold    650   // Ngưỡng so sánh.

#define FIREBASE_HOST "iotnongnghiep-75821.firebaseio.com"
#define FIREBASE_AUTH "X3ngY9AGfQsXuFPBRVwDDh7SrGnVPinKqizp9XBC"
//#define WIFI_SSID "Thukara"
//#define WIFI_PASSWORD "lethu1998"
#define WIFI_SSID "ThuKara"
#define WIFI_PASSWORD "darkcompet"

// Define NTP Client to get time
WiFiClient client;
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);
// Variables to save date and time
String formattedDate;
String dayStamp;
String timeStamp;
String connec;
float NDmax = 0, NDmin = 100, nd, minTemp, maxTemp, avgTemp;
float temperature;
unsigned long ti = 0;
unsigned int AnalogValue;
int autoled, dkled, ledGreen, ledWhite, ledRed, ledBlue;
int led1 = 2, led2 = 2, led3 = 2, led4 = 2;

void setup() {
  // Initialize Serial Monitor
  Serial.begin(115200);

  pinMode(D2, OUTPUT);
  pinMode(D1, OUTPUT);
  pinMode(D4, OUTPUT);
  pinMode(D0, OUTPUT);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);                                      //try to connect with wifi
  Serial.print("Connecting to ");
  Serial.print(WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  // Print local IP address and start web server
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  while (connec != "conected")
  {
    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
    Firebase.setString("connect", "conected");
    connec = Firebase.getString("connect");
    Serial.println(" Connecting to FIREBASE");
    delay(500);
  }
  Serial.println(" Qua roi nhe =========================");

  // Initialize a NTPClient to get time
  timeClient.begin();
  timeClient.setTimeOffset(+7 * 60 * 60);
  // chân cảm biến nhiệt độ
  dht.setup(D6, DHTesp::DHT11);

  Firebase.stream("/setControl");
  fire_set();

  minTemp = Firebase.getFloat("setControl/min");
  delay(100);
  maxTemp = Firebase.getFloat("setControl/max");
  delay(100);
  autoled = Firebase.getInt("setControl/auto");
  delay(100);
  avgTemp = Firebase.getInt("setControl/avg");
  //  lam them
  ledWhite = Firebase.getInt("setControl/led_light_white");
  delay(100);
  ledGreen = Firebase.getInt("setControl/led_light_green");
  delay(100);
  ledRed = Firebase.getInt("setControl/led_temp_red");
  delay(100);
  ledBlue = Firebase.getInt("setControl/led_temp_blue");
  delay(100);
  Serial.println("setmax:" + String(maxTemp) );
  Serial.println("setmin:" + String(minTemp) );
  Serial.println("auto:" + String(autoled) );
  Serial.println("avg:" + String(avgTemp) );
  Serial.println("status led blue:" + String(ledWhite) );
  Serial.println("status led as:" + String(ledGreen) );
  Serial.println("status let red:" + String(ledRed) );
  Serial.println("status led blue:" + String(ledBlue) );

}
void loop() {
  fire_set();
  while (!timeClient.update()) {
    timeClient.forceUpdate();
  }

  AnalogValue = analogRead(pinAnaLight);     // Đọc giá trị analog từ chân A0
  Serial.println(AnalogValue);

  time_r();
  nhietdo();
  fire();
  den();
  delay(200);
  
}
