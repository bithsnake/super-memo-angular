import { Injectable } from '@angular/core';
import { Memo } from 'src/app/memo/memo.model';
import { IMemo } from "../../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class MemoMapperService {
  toClient(memos: Memo[]) : Memo[] {
    return memos.map((memo) => (memo));
  }
}
