import Notiflix, { Notify } from 'notiflix';

export default class SearchCountry {
  constructor() {
    this.name = '';
  }

  fetchCountries() {
    const url = `https://restcountries.com/v3.1/name/${this.name}?fields=name,capital,population,flags,languages`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(
            Notiflix.Notify.failure('Oops, there is no country with that name')
          );
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }
        // console.log(data);

        return data;
      })
      .catch(err => console.log(err));
  }
  get country() {
    return this.name;
  }
  set country(newCountry) {
    this.name = newCountry;
  }
}
