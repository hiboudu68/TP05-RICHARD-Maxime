import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, pipe } from 'rxjs';
import { Produit } from './models/Produit';
import { environment } from '../environements/environement';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private produitSubject: BehaviorSubject<Produit[]> = new BehaviorSubject<Produit[]>([]);
  public produits$: Observable<Produit[]> = this.produitSubject.asObservable();
  
  constructor(private http:HttpClient) { }

  public getProduits(name : string = "", type : string = "", price : number = 0) : Observable<Produit[]> {
    return this.http.get<Produit[]>(environment.backendProduit).pipe(
      map((produits: Produit[]) => {
        return produits.filter(produit => {
          const matchesName = name ? produit.nom && this.normalize(produit.nom).includes(this.normalize(name)) : true;
          const matchesType = type ? produit.type && this.normalize(produit.type).includes(this.normalize(type)) : true;
          const matchesPrice = Number.isNaN(price) || price ? produit.prix !== undefined && produit.prix >= price : true;
          return matchesName || matchesType || matchesPrice;
        });
      }),
      map((filteredProduits: Produit[]) => {
        this.produitSubject.next(filteredProduits);
        return filteredProduits;
      })
    );
  }

  public getProduitsIndividual(name : string = "", type : string = "", price : number = 0) : Observable<Produit[]> {
    return this.http.get<Produit[]>(environment.backendProduit).pipe(
      map((produits: Produit[]) => {
        return produits.filter(produit => {
          const matchesName = name ? name !== "" && produit.nom && this.normalize(produit.nom).includes(this.normalize(name)) : true;
          return matchesName;
        });
      }),
      map((produits: Produit[]) => {
        return produits.filter(produit => {
          const matchesType = type ? type !== "" && produit.type && this.normalize(produit.type).includes(this.normalize(type)) : true;
          return matchesType;
        });
      }),
      map((produits: Produit[]) => {
        return produits.filter(produit => {
          const matchesPrice = price ? produit.prix !== undefined && produit.prix >= price : true;
          return matchesPrice;
        });
      }),
      map((filteredProduits: Produit[]) => {
        this.produitSubject.next(filteredProduits);
        return filteredProduits;
      })
    );
  }

  private normalize(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }  
}