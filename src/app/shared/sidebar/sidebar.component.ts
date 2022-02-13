import { GifsService } from './../../gifs/services/gifs.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

/*En este punto, vamos a necesitar acceder al get que creamos en el gifs.service.ts, al objeto de
capturar/almacenar los tecleos del buscador:
  get historial() {
    return [...this._historial]; }
Lo que pretendemos ahora es replicar esos resultados en nuestro sidebar*/

  get historial() {
    return this.gifsService.historial;
  }

  constructor( private gifsService: GifsService ) { }

  buscar( termino: string ) {
    this.gifsService.buscarGifs(termino);
  }

}
