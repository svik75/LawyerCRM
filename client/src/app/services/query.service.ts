// tslint:disable-next-line: semicolon
import { HttpClient, HttpParams } from '@angular/common//http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from './interfaces';

@Injectable({ providedIn: 'root' })
export class QueryService {

  constructor(private http: HttpClient) {

  }
  // ------------------------------------------
  create(query: Query): Observable<Query> {
    return this.http.post<Query>('/api/query/create', query);
  }
  // ------------------------------------------
  update(query: Query): Observable<Query> {
    return this.http.patch<Query>(`/api/query/patch/${query._id}`, query);
  }
  // ----------------------------------------
  getAll(params: any = {}): Observable<Query[]> {
    return this.http.get<Query[]>(`/api/query/`,  {
      params: new HttpParams({
        fromObject: params })
      });
  }
  // ----------------------------------------
  getByEmail(email: string): Observable<Query> {
    return this.http.get<Query>(`/api/query/${email}`);
  }
  // ----------------------------------------
  getById(id: string): Observable<Query> {
    return this.http.get<Query>(`/api/query/${id}`);
  }
  // ------------------------------------------
  setQueryPath(queryPath) {
    let S = '';
    for (let i of queryPath) {
      S += i + '/';
    }
    localStorage.setItem('queryPath', S);

  }
  // ------------------------------------------
  getQueryPath(): string {
    return localStorage.getItem('queryPath');
  }
}
