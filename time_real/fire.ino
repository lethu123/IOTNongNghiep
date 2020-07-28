void fire()
{
  if (nd != temperature)
  {
    nd = temperature;
    Firebase.setString("currentTemp", String(temperature) );
    // statistical: thống kê
    Firebase.setString("statistical/" +String(dayStamp) +"/"+ String(timeStamp), String(temperature) ); 
    if (temperature > NDmax)
    { NDmax = temperature;
      Firebase.setString("max/temp", String(NDmax) );
      Firebase.setString("max/time", String(timeStamp) );
    //      difference: độ chêch lệch
      Firebase.setString("difference", String(NDmax - NDmin) );
    }
    if (temperature < NDmin)
    { NDmin = temperature;
      Firebase.setString("min/temp", String(NDmin) );
      Firebase.setString("min/time", String(timeStamp) );
      Firebase.setString("difference", String(NDmax - NDmin) );
    }
  }

}
