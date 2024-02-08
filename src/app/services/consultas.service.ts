import { Injectable } from '@angular/core';
import { AdministradorDistribuidor, Cajero, Concepto, Plataforma, Status, TipoPago } from '../models/consultas.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  private url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public getAdministradores(): Observable<AdministradorDistribuidor[]>{
    return this.http.get<AdministradorDistribuidor[]>(`${this.url}/administradores`);
  }

  public getCajeros(): Observable<Cajero[]>{
    return this.http.get<Cajero[]>(`${this.url}/cajero`);
  }

  public getTipoPago(): Observable<TipoPago[]>{
    return this.http.get<TipoPago[]>(`${this.url}/tipopago`);
  }

  public getStatus(): Observable<Status[]>{
    return this.http.get<Status[]>(`${this.url}/status`);
  }

  public getPlataforma(): Observable<Plataforma[]>{
    return this.http.get<Plataforma[]>(`${this.url}/plataforma`);
  }

  public getConcepto(): Observable<Concepto[]>{
    return this.http.get<Concepto[]>(`${this.url}/concepto`);
  }
}
