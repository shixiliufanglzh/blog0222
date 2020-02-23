import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configFilePath = '../../../assets/config.json';
  serviceUrl = '';
  
  constructor(
    private http: HttpClient
  ) { }

  async init() {
    const config: any = await this.http.get(this.configFilePath).toPromise();
    this.serviceUrl = config.serviceUrl;
    // console.log(config);
    return;
  }
}
