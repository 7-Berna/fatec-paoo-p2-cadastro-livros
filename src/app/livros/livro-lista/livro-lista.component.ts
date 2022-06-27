import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Livro } from '../livro.model';
import { LivroService } from '../services/livro.service';


@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})

export class LivroListaComponent implements OnInit, OnDestroy {

  livros: Livro[] = []
  private livroSubscription: Subscription;

  constructor(public livroService: LivroService){}

  ngOnInit(): void{
    this.livroService.getLivros();
    this.livroSubscription =
      this.livroService
    .getListaLivrosAtualizadaObservable()
    .subscribe((livros: Livro[]) => {
      this.livros = livros;
    })
  };

  ngOnDestroy(): void{
    this.livroSubscription.unsubscribe();
  }

  onDelete (id: string): void{
    this.livroService.removerLivro(id);
}

}
