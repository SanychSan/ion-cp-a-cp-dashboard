
import { Component, inject, computed, Signal, EffectRef, effect, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

import { SpotApiService } from 'src/app/services/spot-api.service';
import { Coin, Transaction } from 'src/app/classes/coin';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.page.html',
  styleUrls: ['./coin.page.scss'],
  imports: [CommonModule, IonicModule, MatTableModule]
})
export class CoinPage implements OnDestroy {
  private destroyRef: EffectRef;
  private cdr = inject(ChangeDetectorRef);
  private spotService = inject(SpotApiService);
  private activatedRoute = inject(ActivatedRoute);

  displayedColumns = ['direction', 'qty', 'price', 'date'];
  coinTransactionsSource = new MatTableDataSource<Transaction>();

  public coin: Signal<Coin | null> = computed(() => {
    const coins = this.spotService.coins();
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    const coin = coins.find(c => c.name.toLowerCase() === id.toLowerCase()) || null;
    console.log('coin', coin);
    return coin;
  });

  constructor() {
    this.destroyRef = effect(() => {
      const coin = this.coin();
      const transactions = [...(coin?.transactions || [])].reverse();
      this.coinTransactionsSource.data = transactions;

      // console.log('SpotPage coins', this.spotSource.data);
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy() {
    this.destroyRef.destroy();
  }
}
