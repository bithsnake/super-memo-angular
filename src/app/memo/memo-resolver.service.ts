import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Resolver } from 'dns';
import { Observable } from 'rxjs';
import { MemoServices } from '../shared/services/memo.service';
import { Memo } from './memo.model';
@Injectable({
  providedIn: 'root'
})
export class MemoResolver implements Resolve<Memo> {

  constructor(private memoServices : MemoServices) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Memo> | Promise<Memo> | Memo {
    console.log("resolving url: ", this.memoServices.GetMemo(Number(+route.params['id'])));
    return this.memoServices.GetMemo(Number(+route.params['id']));
  }
}
