import { HttpClient, HttpParams } from '@angular/common//http';
import { Injectable } from '@angular/core';
import { Contracts } from '../services/interfaces';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ContractService {
  constructor(private http: HttpClient) {}

// ------------------------------------------
create(contract: Contracts): Observable<Contracts> {
  return this.http.post<Contracts>('/api/contract/create', contract);
}
// ------------------------------------------
update(contract: Contracts): Observable<Contracts> {
  return this.http.patch<Contracts>(`/api/contract/patch/${contract._id}`, contract);
}

// ----------------------------------------
getContracts(params: any = {}): Observable<Contracts[]> {
  return this.http.get<Contracts[]>(`/api/contract/`,  {
    params: new HttpParams({
      fromObject: params })
    });
}


}
