import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { SearchGifsResponse, Gif } from './../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
  /* Con "provideIn: 'root'", Angular eleva el gif.services a un nivel global de la aplicación y, por tanto,
   tampoco será necesario especificarlo en los providers (ngModule del gif.module.ts).*/
})

export class GifsService {
  private apiKey: string = 'U09VPPg22s2bryKYkQ4xEY42RPU4DpLg';
  /*Almacenamos aquí, en apiKey: la key de la api que vamos a consumir.
  Generada desde https://developers.giphy.com/ */
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  //Creamos una propiedad privada para almacenar los strings que introducimos en el buscador
  private _historial: string[] = [];
    /*"_historial", precedido de guión bajo, es una convención usada en programación para
    delimitar su alcance de forma significativa.*/

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
      /*Utilizamos el spread operator para que, en caso de que haya cambios, nunca
      modifiquemos el array original*/
      /*Este get es necesario para capturar los tecleos que introducimos en el buscador */
  }

  constructor( private http: HttpClient ) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    /*De esta manera, cuando recarguemos la página (F5), tanto el historial como los resultados
    persistirán en el almacenamiento local (local storage) y no desaparecerá la información.*/
  }

  //Creamos ahora la manera de insertar valores a ese nuevo historial y, para ello, creamos una función:
  buscarGifs( query: string = '' ) {

    query = query.trim().toLocaleLowerCase();

    if ( !this._historial.includes( query ) ) {
      /*Si lo que inserto (no=!) incluye algo que ya está insertado (query), lo inserto
      en el sidebar y lo hago en primer lugar */
      this._historial.unshift( query );
      //Acotamos el historial de resultados del sidebar a 10
      this._historial = this._historial.splice(0, 10);
      //Almacenamos la info en el localStorage
      localStorage.setItem('historial', JSON.stringify(this._historial));
    };

    //Creación de params de http para hacer más manejable la URL
    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', query);
        console.log(params.toString());

    //Llamada a API:
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params })
      .subscribe( (resp) => {
       /*.subscribe() es muy parecido al .then(), se va a ejecutar cuando tengamos al resolución
      del get(url)*/
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
      } )
  }
}
