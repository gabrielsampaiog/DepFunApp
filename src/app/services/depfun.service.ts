import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DepfunService {
  private depIds: number[] = [];

  constructor(private http: HttpClient) {}
  getDeps(): Observable<any> {
    let url = 'http://localhost:5047/api/Departamento/BuscarDeps';
    return this.http.get(url);
  }

  postDep(dados: any): Observable<any> {
    let url = 'http://localhost:5047/api/Departamento/AdicionarDep';
    return this.http.post(url, dados);
  }

  putDep(id: number, dados: any): Observable<any> {
    let url = `http://localhost:5047/api/Departamento/AtualizarDep/${id}`;
    return this.http.put(url, dados);
  }

  deleteDep(id: number): Observable<any> {
    let url = `http://localhost:5047/api/Departamento/ApagarDep/${id}`;
    return this.http.delete(url);
  }

  getFuns(id: number): Observable<any> {
    let url = `http://localhost:5047/api/Funcionario/BuscarFuns/${id}`;
    return this.http.get(url);
  }

  postFun(dados: any): Observable<any> {
    let url = 'http://localhost:5047/api/Funcionario/AdicionarFun';
    return this.http.post(url, dados);
  }

  putFun(id: number, dados: any): Observable<any> {
    let url = `http://localhost:5047/api/Funcionario/AtualizarFun/${id}`;
    return this.http.put(url, dados);
  }

  deleteFun(id1: number): Observable<any> {
    let url = `http://localhost:5047/api/Funcionario/ApagarFun/${id1}`;
    return this.http.delete(url);
  }

  getDepIds(): Observable<number[]> {
    return this.getDeps().pipe(
      map((deps: any[]) => deps.map((dep: { id: any }) => dep.id))
    );
  }
}
