import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
@Injectable()
export class UrlService {

  constructor(private router : Router) {
    this.currentUrl = '';
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((res) => {
      if (this._previousUrl !== this.currentUrl) {
        this._previousUrl = this.currentUrl;
      }
      this.currentUrl = this.router.url;
    });


  }
  public _previousUrl: string | null = '';
  public currentUrl : string | null =''
  private previousUrl: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);
  public previousUrl$: Observable<string | null> = this.previousUrl.asObservable();


  public setPreviousUrl(previousUrl: string) {
    // this._previousUrl = previousUrl;
    // this.previousUrl.next(previousUrl);
  }
    /*Goes back to previous page */
    public GoBack() {
      this.router.navigate([this._previousUrl]);
    }
}
