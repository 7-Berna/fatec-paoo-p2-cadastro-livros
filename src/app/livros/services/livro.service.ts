import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Livro } from "../livro.model";


@Injectable({ providedIn: 'root'})
export class LivroService {

  private livros: Livro[] = [];
  private listaLivrosAtualizada = new Subject<Livro[]>();

  constructor (private httpClient: HttpClient){

  }

  getLivros(): void {
    this.httpClient.get<{mensagem: string, livros: Livro[]}>
    ('http://localhost:3000/api/livros')
    .subscribe((dados) => {
      this.livros = dados.livros;
      this.listaLivrosAtualizada.next([...this.livros]);
    })
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
    this.httpClient.post<{mensagem: string}>
    ('http://localhost:3000/api/livros', livro)
    .subscribe((dados) => {
      console.log(dados.mensagem);
      this.livros.push(livro);
      this.listaLivrosAtualizada.next([...this.livros]);
    })
  }
}
