import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nome = null;
  idade = null;
  pessoas = [];
  totalizador = null;
  jovem =  null;
  velho = null;

  adicionar() {
    this.pessoas.push({nome:this.nome, idade:this.idade});
    this.nome = null;
    this.idade = null;
    this.totalizador +=1;
    this.selecao();
  }
  
  excluir(id) {
    this.pessoas.splice(this.pessoas.indexOf(id),1);
    this.totalizador -=1
    this.selecao();
  }

  selecao(){
    var idades = this.pessoas.map( ({idade}) => idade );

    var max = Math.max(...idades);
    var min = Math.min(...idades);

    this.jovem = this.pessoas.find(({ idade }) => idade === min);
    this.velho = this.pessoas.find(({ idade }) => idade === max);
    
  }
}
