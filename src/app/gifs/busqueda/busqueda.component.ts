import { GifsService } from './../services/gifs.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})

export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  /*Typescript me marca que ese elemento (txtBuscar) no existe.
  Al poner un "!" al final del nombre, le estamos pidiendo a Typescript que me permita usarlo,
  asegurándole que ese elemento siempre va a existir.
  Esta expresión se conoce como: Non-null assertion operator*/

  constructor( private gifsService: GifsService) {}

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;

    if (valor.trim().length === 0) {
      return;
    }

    /*EL método trim() sirve para eliminar los espacios en blanco que encontramos tanto
    a la izquierda como a la derecha de una cadena. Es lo propio en este caso en el que queremos
    que no se graben los espacios en blanco que los usuarios introducen (espacio en blanco + enter)*/

    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value=''
  }

  /*this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value=''
    (1) Insertamos nuevos valores - los que introducimos en el campo de búsqueda
    (2) Los convertimos en un array
    */
}
