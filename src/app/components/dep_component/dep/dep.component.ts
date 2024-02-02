import { Component } from '@angular/core';
import { DepfunService } from '../../../services/depfun.service';
import { Router } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-dep',
  templateUrl: './dep.component.html',
  styleUrl: './dep.component.css',
})
export class DepComponent {
  respostaDaApi: any;
  mostrarInput: boolean = false;
  NovoDep: { nome: string; sigla: string } = { nome: '', sigla: '' };
  constructor(private depFun: DepfunService, private router: Router) {}

  carregarDeps() {
    this.depFun.getDeps().subscribe((data) => {
      this.respostaDaApi = data;
      this.respostaDaApi = this.respostaDaApi.map((item: any) => ({
        ...item,
        editando: false,
      }));
    });
  }

  ngOnInit(): void {
    this.carregarDeps();
  }

  mostrarInputs() {
    this.mostrarInput = true;
  }

  adicionarDep(dados: any) {
    if (
      !dados.nome ||
      !dados.nome.trim() ||
      !dados.sigla ||
      !dados.sigla.trim()
    ) {
      alert('Nome e/ou sigla não podem ficar vazios.');
      return;
    }
    if(dados.nome.length>100 || dados.sigla.length >5)
    {
      alert("O nome não pode exceder 100 carácteres e a sigla 5.");
      return;
    }
    this.depFun.postDep(dados).subscribe((data) => {
      if (data != null) {
        console.log('Departamento adicionado com sucesso.');
      } else {
        console.error('Erro ao adicionar departamento.');
      }
      this.carregarDeps();
      this.mostrarInput = false;
      this.NovoDep = { nome: '', sigla: '' };
    });
  }

  deletarDep(id: number) {
    this.depFun.deleteDep(id).subscribe((data) => {
      if (data === true) {
        console.log('Departamento excluído com sucesso.');
        this.carregarDeps();
      } else {
        console.error('Falha ao excluir o departamento pedido.');
      }
    });
  }

  edicaoDep(item: any) {
    item.editando = true;
  }

  editarDep(id: number, dados: any) {
    this.depFun.putDep(id, dados).subscribe((data) => {
      if (data !== null) {
        console.log(data);
        this.carregarDeps();
      } else {
        console.error('Falha ao editar o departamento.');
      }
    });
  }

  concluirEdicao(id: number, dados: any) {
    if (
      (!dados.novoNome || !dados.novoNome.trim()) &&
      (!dados.novaSigla || !dados.novaSigla.trim())
    ) {
      alert('Nome e/ou sigla não podem ficar vazios.');
      return;
    }

    if(dados.novoNome.length>100 || dados.novaSigla.length >5)
    {
      alert("O nome não pode exceder 100 carácteres e a sigla 5.");
      return;
    }

    if (!dados.novoNome || !dados.novoNome.trim()) {
      dados.novoNome = dados.nome;
    }

    if (!dados.novaSigla || !dados.novaSigla.trim()) {
      dados.novaSigla = dados.sigla;
    }

    dados.nome = dados.novoNome;
    dados.sigla = dados.novaSigla;
    delete dados.editando;
    this.editarDep(id, dados);
    this.carregarDeps();
    dados.editando = false;
  }

  redirecionarFuncionario(id: number) {
    this.router.navigate(['/app-fun', id]);
  }
}
