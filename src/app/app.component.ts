import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ip-address-tracker';
  searchValue = "";
  isError = false;

  data = {
    "ip address": '-- -- --',
    "location": '-- -- --',
    "timezone": '-- -- --',
    "isp": "-- -- --"
  }

  constructor(public http: HttpClient) {
    this.geoFindMe();
  }

  orderOriginal = (a: any, b: any): number => {
    return 0;
  }

  findInitialIP(): void {
    console.log("findInitialIP");

    this.http.get("https://api.ipify.org?format=json").subscribe((res: any) => {
      this.searchValue = res.ip;
    })
  }

  searchSubmit(value: { searchValue: '' }): void {
    this.searchValue = value.searchValue;
  }

  getIPDetails(value: any): void {
    if (value === "Invalid IP") {
      this.isError = true;
    } else {
      this.data = value;
    }
  }

  geoFindMe(): void {
    const success = async (position: { coords: { latitude: any; longitude: any; }; }) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      await this.findInitialIP();
    }

    function error() {
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

