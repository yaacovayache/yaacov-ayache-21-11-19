import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FavoriteService {

  constructor() {}

  public addOrRemoveFavoritesCity(state, city) {
    const citiesStorage = window.localStorage.getItem('cities') ?
      JSON.parse(window.localStorage.getItem('cities')) : [];

    if (state) {
      citiesStorage.push(city);
    } else {

      for (let i = 0; i < citiesStorage.length; i++) {
        if (citiesStorage[i].Key === city.Key) {
          citiesStorage.splice(i, 1);
          break;
        }
      }
    }
    window.localStorage.setItem('cities', JSON.stringify(citiesStorage));
  }
  public getFavoritesCities() {
    return JSON.parse(window.localStorage.getItem('cities'));
  }
}
