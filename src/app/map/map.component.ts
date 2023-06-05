import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MarkerService } from '../services/marker.service';
import { Input } from "@angular/core";
import * as L from 'leaflet';
const iconUrl = 'assets/icon-location.svg';
const iconDefault = L.icon({
  iconUrl,
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  public ipDetails: any;
  public marker: any;
  public ipaddress!: string;
  @Input() set ipaddressvalue(ipaddressvalue: string) {
    this.ipaddress = ipaddressvalue;
    this.callMarkerService();
    this.removeMarker(this.map);
  }

  get ipaddressvalue(): any { 
    return this.ipaddress;
  }

  @Output() passIPValue = new EventEmitter();

  constructor(public MarkerService: MarkerService) { }

  passIPAddressDetails(ipDetails: any) {
    console.log("calling passIPAddressDetails", ipDetails);
    this.passIPValue.emit(ipDetails);
  }

  setMapView(map: L.Map, lat: any, long: any): void {
    map.setView([lat, long], 3)
  }

  removeMarker(map: L.Map): void {
    if (this.marker !== undefined) {
      map.removeLayer(this.marker)
    }
  }

  callMarkerService(): void {
    if (this.ipaddress !== '' && this.ipaddress !== undefined) {
      this.MarkerService.makeMarker(this.ipaddress).subscribe((res: any) => {
        const lon = res.location.lng;
        const lat = res.location.lat;
        this.marker = L.marker([lat, lon]);
        console.log(this.marker);
        this.setMapView(this.map, lat, lon);
        this.marker.addTo(this.map);
        this.ipDetails = {
          "ip address": res.ip,
          "location": `${res.location.city} ${res.location.region} ${res.location.country} ${res.location.postalCode}`,
          "timezone": res.location.timezone,
          "isp": res.isp
        }
        this.passIPAddressDetails(this.ipDetails);
      });
    }
  }

  private initmap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });

    const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.initmap();
    this.callMarkerService();
  }
}
