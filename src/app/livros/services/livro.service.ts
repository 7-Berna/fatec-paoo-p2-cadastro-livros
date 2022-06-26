import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Livro } from "../livro.model";


@Injectable({ providedIn: 'root'})
export class LivroService {

  private livros: Livro[] = [];
  private listaLivrosAtualizada = new Subject<Livro[]>();

  getLivros(): Livro[] {
    return [...this.livros];
  }

  getListaLivrosAtualizadaObservable(){
    return this.listaLivrosAtualizada.asObservable();
  }

  adicionarLivro(id:number, titulo:string, autor:string, numero_paginas:number){
    const livro: Livro = {
      id: id,
      titulo: titulo,
      autor: autor,
      numero_paginas: numero_paginas,
    };
    this.livros.push(livro);
    this.listaLivrosAtualizada.next([...this.livros])
  }
}
