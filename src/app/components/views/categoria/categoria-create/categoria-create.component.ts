import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent implements OnInit {
  categoria : Categoria = {
    nome: '',
    descricao:''
  }

  constructor(private service : CategoriaService, private router: Router ) { }

  ngOnInit(): void {
  }

  create(): void{
    this.service.create(this.categoria).subscribe((resposta)  => {
      //Responsavel por direcionar a página assim que o arquivo for salvo
      this.router.navigate(['categorias'])
      //Irá mostrar uma mensagem informando que a categoria foi salva
      this.service.mensagem('Categoria criado com Sucesso!')
      console.log(resposta)
    }, 
    //Criado uma array para buscar os erros quando o formulário não atender as condições.
    err => {
      for (let i = 0; i < err.error.errors.length; i++){
        this.service.mensagem(err.error.errors[i].message)
      }
    }
    );
  }

}
