import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ip-address-tracker';
  searchValue = "";

  data = {
    "ip address": '-- -- --',
    "location": '-- -- --',
    "timezone": '-- -- --',
    "isp": "-- -- --"
  }

  constructor(public http: HttpClient){
    this.geoFindMe();
  }
  ngOnInit(): void {
    
  }
  
  orderOriginal = (a: any, b:any): number => {
    return 0;
  }
  
  findInitialIP(): void {
    console.log("findInitialIP");

    this.http.get("https://api.ipify.org?format=json").subscribe((res: any) => {
      this.searchValue = res.ip;
    })
  }

  searchSubmit(value: {searchValue: ''}): void {
    console.log("SUbmit", value);
    this.searchValue = value.searchValue;
  }

  getIPDetails(value: any): void {
    console.log("ipdetails is getting called", value);
    this.data = value;
  }

   geoFindMe(): void {
    const success = async (position: { coords: { latitude: any; longitude: any; }; }) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log("latlong",latitude, longitude);
      await this.findInitialIP();
    }
  
    function error() {
      console.log("Unable to retrieve your location");
      alert("Unable to retrieve your location.Please enable location access");
    }
  
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

}

