import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  marker: any;
  constructor(public http: HttpClient) { }

  makeMarker(ipaddress: any): Observable<any> {
    return this.http.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_lib0WVhiRPcu7PWJe17ue5hkG3VpG&ipAddress=${ipaddress}`);
  }
}
