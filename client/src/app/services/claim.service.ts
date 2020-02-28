import { HttpClient, HttpParams } from '@angular/common//http';
import { Injectable } from '@angular/core';
import { Claim } from '../services/interfaces';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ClaimService {
  constructor(private http: HttpClient) {}

// ------------------------------------------
create(claim: Claim): Observable<Claim> {
  return this.http.post<Claim>('/api/claim/create', claim);
}
// ------------------------------------------
update(claim: Claim): Observable<Claim> {
  return this.http.patch<Claim>(`/api/claim/patch/${claim._id}`, claim);
}
// ----------------------------------------
getClaimFl(params: any = {}): Observable<Claim[]> {
  return this.http.get<Claim[]>(`/api/claim/fl`,  {
    params: new HttpParams({
      fromObject: params })
    });
}
// ----------------------------------------
getClaimUl(params: any = {}): Observable<Claim[]> {
  return this.http.get<Claim[]>(`/api/claim/ul`,  {
    params: new HttpParams({
      fromObject: params })
    });
}


}
