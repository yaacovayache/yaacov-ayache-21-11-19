import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import {FavoriteService} from '../favorite.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public cities: [];
  public searchKey = '';
  public currentWeather = {days: null, DailyForecasts: null};
  public currentCity = {Key: '215854', LocalizedName: 'Tel Aviv', isFavorite: false};
  public citiesStorage = JSON.parse(window.localStorage.getItem('cities')) || [];

  constructor(private weatherService: WeatherService, private favoriteService: FavoriteService) { }

  ngOnInit() {
    this.weatherService.getCityCurrentWeather(this.currentCity.Key)
      .subscribe(currentWeather => {
        this.currentWeather = currentWeather;
        this.weatherService.getCityCurrentWeatherFiveDays(this.currentCity.Key)
          .subscribe(currentWeatherDays => {
            this.currentWeather.days = currentWeatherDays;
            this.citiesStorage.forEach(filteredCity => {
              if (filteredCity.Key === this.currentCity.Key) {
                this.currentCity.isFavorite = filteredCity.isFavorite;
              }
            });
          });
      });
  }

  public getWeatherCitiesByKeyWord(key) {
    this.weatherService.getWeatherCitiesByKeyWord(key)
      .subscribe(cities => {
        this.cities = cities;
      });
  }

  public setCurrentCity(city) {
    this.citiesStorage.forEach(filteredCity => {
      if (filteredCity.Key === city.Key) {
        console.log('enter');
        city.isFavorite = filteredCity.isFavorite;
      }
    });
    this.currentCity = city;
    this.weatherService.getCityCurrentWeatherFiveDays(city.Key)
      .subscribe(currentWeatherDays => {
        this.currentWeather.days = currentWeatherDays;
      });
    this.cities = [];
  }

  public setCurrentCityFavorite(state, city) {
    city['isFavorite'] = state;
    this.favoriteService.addOrRemoveFavoritesCity(state, city);
  }
}
