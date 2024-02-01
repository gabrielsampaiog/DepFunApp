import { Component } from '@angular/core';
import { DepfunService } from '../../../services/depfun.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fun',
  templateUrl: './fun.component.html',
  styleUrl: './fun.component.css',
})
export class FunComponent {
  respostaDaApi: any;
  constructor(private depFun: DepfunService, private route: ActivatedRoute) {}
  mostrarInput: boolean = false;
  id_dep: number = 0;
  ids_deps: number[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id_dep = +params['id'];
      this.depFun.getFuns(this.id_dep).subscribe((data) => {
        this.respostaDaApi = data;
        this.depFun.getDepIds().subscribe((ids) => {
          this.ids_deps = ids;
        });
      });
    });
  }

  NovoFun: { nome: string; foto: string; rg: string; departamentoId: number } =
    { nome: '', foto: '', rg: '', departamentoId: this.id_dep };

  carregarFuns() {
    this.depFun.getFuns(this.id_dep).subscribe((data) => {
      this.respostaDaApi = data;
      this.respostaDaApi = this.respostaDaApi.map((item: any) => ({
        ...item,
        editando: false,
      }));
    });
  }

  mostrarInputs() {
    this.mostrarInput = true;
  }

  adicionarFun(dados: any) {
    if (
      !dados.nome ||
      !dados.nome.trim() ||
      !dados.foto ||
      !dados.foto.trim() ||
      !dados.rg ||
      !dados.rg.trim()
    ) {
      alert('Nenhum campo pode ficar vazio.');
      return;
    }
    dados.departamentoId = this.id_dep;
    this.depFun.postFun(dados).subscribe((data) => {
      if (data != null) {
        console.log('Funcionário adicionado com sucesso.');
      } else {
        console.error('Erro ao adicionar funcionário.');
      }
      this.carregarFuns();
      this.mostrarInput = false;
      this.NovoFun = {
        nome: '',
        foto: '',
        rg: '',
        departamentoId: this.id_dep,
      };
    });
  }

  deletarFun(id_fun: number) {
    this.depFun.deleteFun(id_fun).subscribe((data) => {
      if (data === true) {
        console.log('Funcionário excluído com sucesso.');
        this.carregarFuns();
      } else {
        console.error('Falha ao excluir o funcionário pedido.');
      }
    });
  }

  edicaoFun(item: any) {
    item.editando = true;
  }

  editarFun(id_fun: number, dados: any) {
    this.depFun.putFun(id_fun, dados).subscribe((data) => {
      if (data !== null) {
        this.carregarFuns();
      } else {
        console.error('Falha ao editar o funcionário.');
      }
    });
  }

  concluirEdicao(id_fun: number, dados: any) {
    if (
      (!dados.novoNome || !dados.novoNome.trim()) &&
      (!dados.novaFoto || !dados.novaFoto.trim()) &&
      (!dados.novoRG || !dados.novoRG.trim()) &&
      (dados.novoDep === undefined || dados.novoDep === null)
    ) {
      alert('Todos os campos não podem ficar vazios ao mesmo tempo.');
      return;
    }

    if (!dados.novoNome || !dados.novoNome.trim()) {
      dados.novoNome = dados.nome;
    }

    if (!dados.novaFoto || !dados.novaFoto.trim()) {
      dados.novaFoto = dados.foto;
    }

    if (!dados.novoRG || !dados.novoRG.trim()) {
      dados.novoRG = dados.rg;
    }

    if (!dados.novoDep) {
      dados.novoDep = dados.departamentoId;
    }

    if (this.ids_deps.includes(dados.novoDep)) {
      console.log('Esse departamento existe.');
    } else {
      alert('O ID do departamento não é válido.');
      return;
    }

    dados.nome = dados.novoNome;
    dados.foto = dados.novaFoto;
    dados.rg = dados.novoRG;
    dados.departamentoId = dados.novoDep;
    delete dados.editando;
    this.editarFun(id_fun, dados);
    this.carregarFuns();
    dados.editando = false;
  }
}
