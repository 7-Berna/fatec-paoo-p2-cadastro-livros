import { Component } from '@angular/core';
import { Livro } from './livros/livro.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //meuNumero: number = 2
  livros: Livro[] = []
  onLivroAdicionado (livro): void{
    //... operador spread
    this.livros = [...this.livros, livro]
  }
}
