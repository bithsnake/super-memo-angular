import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit, OnDestroy {
  errorMessage: string = "";
  constructor(public dataSubscription: Subscription,private route : ActivatedRoute) { }
  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  ngOnInit() {
    // this.errorMessage = this.route.snapshot.data['message'];
    this.dataSubscription = this.route.data.subscribe(
      (data: Data) => {
        this.errorMessage = data['message'];
      }
    )
  }
}
