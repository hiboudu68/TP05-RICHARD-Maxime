import { Component, OnInit } from '@angular/core';
import { Produit } from '../models/Produit';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ApiService } from '../api.service';
import { AddProduct } from '../cart/cart.actions';
import { ProduitInCart } from '../models/ProduitInCart';
import { CartState } from '../cart/cart.state';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {

  produits : Observable<Produit[]> | undefined;

  constructor(private apiService : ApiService, private store: Store) { }

  ngOnInit() {
    this.apiService.getProduits().subscribe();
    this.produits = this.apiService.produits$;
  }

  async addToCart(product: Produit) {
    this.store.dispatch(new AddProduct(product));
  }
}




