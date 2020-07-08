void fire()
{
  if (nd != temperature)
  {
    nd = temperature;
    Firebase.setString("nhiet do hien tai", String(temperature) );
    Firebase.setString("thong ke/" +String(dayStamp) +"/"+ String(timeStamp), String(temperature) );
    if (temperature > NDmax)
    { NDmax = temperature;
      Firebase.setString("max/nhiet do", String(NDmax) );
      Firebase.setString("max/time", String(timeStamp) );
      Firebase.setString("do chenh lenh", String(NDmax - NDmin) );
    }
    if (temperature < NDmin)
    { NDmin = temperature;
      Firebase.setString("min/nhietdo", String(NDmin) );
      Firebase.setString("min/time", String(timeStamp) );
      Firebase.setString("do chenh lenh", String(NDmax - NDmin) );
    }
  }

}
