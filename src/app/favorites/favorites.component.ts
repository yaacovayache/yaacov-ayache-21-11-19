import { Component, OnInit } from '@angular/core';
import {FavoriteService} from '../favorite.service';
import {WeatherService} from '../weather.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  public favoritesCities = [];

  constructor(private favoriteService: FavoriteService, private weatherService: WeatherService) { }

  ngOnInit() {
    this.favoritesCities = this.favoriteService.getFavoritesCities();
    if (this.favoritesCities) {
      this.favoritesCities.forEach(city => {
        this.weatherService.getCityCurrentWeather(city.Key)
          .subscribe(currentWeather => {
            city.currentWeather = currentWeather;
          });
      });
    }
  }

}
