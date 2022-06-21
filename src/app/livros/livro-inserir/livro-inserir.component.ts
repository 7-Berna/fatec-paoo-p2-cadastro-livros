import { Component, EventEmitter, Output } from '@angular/core'
import { Livro } from '../livro.model';

@Component({
    selector: 'app-livro-inserir',
    templateUrl: './livro-inserir.component.html',
    styleUrls: ['./livro-inserir.component.css']
})
export class LivroInserirComponent{

    @Output()
    livroAdicionado = new EventEmitter<Livro>();

    id: number;
    titulo: string;
    autor: string;
    numero_paginas: number;

    onAdicionarLivro(){
        //1. construir um objeto livro que contém id, titulo, autor e numero de paginas
        const livro: Livro = {
            id: this.id,
            titulo: this.titulo,
            autor: this.autor,
            numero_paginas: this.numero_paginas
        }
        //2. passar esse objeto como argumento para o método emit
        this.livroAdicionado.emit(livro);
    }

}
