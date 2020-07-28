#include <ESP8266WiFi.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <FirebaseArduino.h>
#include <Arduino.h>
#include "DHTesp.h"
DHTesp dht;



#define FIREBASE_HOST "iotnongnghiep-75821.firebaseio.com"
#define FIREBASE_AUTH "X3ngY9AGfQsXuFPBRVwDDh7SrGnVPinKqizp9XBC"
#define WIFI_SSID "Thukara"
#define WIFI_PASSWORD "lethu1998"

// Define NTP Client to get time
WiFiClient client;
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);
// Variables to save date and time
String formattedDate;
String dayStamp;
String timeStamp;
String connec;
float NDmax = 0, NDmin = 100, nd, minTemp, maxTemp;
float temperature;
unsigned long ti = 0;
int light, autoled, dkled, ledAS;


void setup() {
  // Initialize Serial Monitor
  Serial.begin(115200);
  pinMode(D0, INPUT);
  pinMode(D2, OUTPUT);
  pinMode(D3, OUTPUT);
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
    //Serial.println(" Connecting to FIREBASE");
  }

  // Initialize a NTPClient to get time
  timeClient.begin();
  timeClient.setTimeOffset(+7 * 60 * 60);

  dht.setup(D1, DHTesp::DHT11);

  Firebase.stream("/setTemp");
  fire_set();
  
  minTemp = Firebase.getFloat("setTemp/min");
  maxTemp = Firebase.getFloat("setTemp/max");
  autoled = Firebase.getInt("setTemp/auto");
  dkled = Firebase.getInt("setTemp/control");
  //  lam them
  ledAS = Firebase.getInt("light/led_light");
  Serial.println("setmax:" + String(maxTemp) );
  Serial.println("setmin:" + String(minTemp) );
  Serial.println("auto:" + String(autoled) );
  Serial.println("dkled:" + String(dkled) );
  Serial.println("status led as:" + String(ledAS) );
}
void loop() {
  while (!timeClient.update()) {
    timeClient.forceUpdate();
  }
  light = digitalRead(D0); // read the sensor
  time_r();
  fire_set();
  nhietdo();
  fire();
  den();

  delay(1000);
}
