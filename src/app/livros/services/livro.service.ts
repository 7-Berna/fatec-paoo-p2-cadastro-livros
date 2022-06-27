import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Livro } from "../livro.model";
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root'})
export class LivroService {

  private livros: Livro[] = [];
  private listaLivrosAtualizada = new Subject<Livro[]>();

  constructor (private httpClient: HttpClient){

  }

  getLivros(): void {
    this.httpClient.get<{mensagem: string, livros: any}>
    ('http://localhost:3000/api/livros')
    .pipe(map((dados) => {
      return dados.livros.map(livro => {
        return {
          id: livro._id,
          titulo: livro.titulo,
          autor: livro.autor,
          numero_paginas: livro.numero_paginas,
        }
      })

    }))
    .subscribe((livros) => {
      this.livros = livros;
      this.listaLivrosAtualizada.next([...this.livros]);
    })
  }


  getListaLivrosAtualizadaObservable(){
    return this.listaLivrosAtualizada.asObservable();
  }

  adicionarLivro(titulo:string, autor:string, numero_paginas:number){
    const livro: Livro = {
      id: "0",
      titulo: titulo,
      autor: autor,
      numero_paginas: numero_paginas,
    };
    this.httpClient.post<{mensagem: string, id: string}>
    ('http://localhost:3000/api/livros', livro)
    .subscribe((dados) => {
      livro.id = dados.id;
      this.livros.push(livro);
      this.listaLivrosAtualizada.next([...this.livros]);
    })
  }

  removerLivro (id: string): void{
    this.httpClient.delete(`http://localhost:3000/api/livros/${id}`).subscribe(() => {
      this.livros = this.livros.filter((liv) => {
        return liv.id !== id;
      });
      this.listaLivrosAtualizada.next([...this.livros]);
    });
  }
}
