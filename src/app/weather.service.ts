import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherApi } from '../const/weather-api';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  constructor(private http: HttpClient) { }

  public getWeatherCitiesByKeyWord(key): Observable<any> {
    return this.http.get(
      WeatherApi.urlLocation
      + WeatherApi.paramKeys.cities
      + '/'
      + WeatherApi.paramKeys.autocomplete
      + '?apikey='
      + WeatherApi.key
      + '&q='
      + key
    )
      .pipe (map(res => {
        return res;
      }));
  }

  public getCityCurrentWeather(city): Observable<any> {
    return this.http.get(
      WeatherApi.urlForecast
      + WeatherApi.paramKeys.daily
      + '/'
      + WeatherApi.paramKeys.day
      + '/'
      + city
      + '?apikey='
      + WeatherApi.key
      // 'assets/forcast.api.json'
    )
      .pipe (map(res => {
        return res;
      }));
  }

  public getCityCurrentWeatherFiveDays(city): Observable<any> {
    return this.http.get(
      WeatherApi.urlForecast
      + WeatherApi.paramKeys.daily
      + '/'
      + WeatherApi.paramKeys.days
      + '/'
      + city
      + '?apikey='
      + WeatherApi.key
      // 'assets/forcast.api.json'
    )
      .pipe (map(res => {
        return res;
      }));
  }
}
