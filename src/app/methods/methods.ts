import { Memo } from "../memo/memo.model";

export function compareName( memo_a : Memo, memo_b : Memo ) {
  if ( memo_a.Title < memo_b.Title ){
    return -1;
  }
  if ( memo_a.Title > memo_b.Title ){
    return 1;
  }
  return 0;
}
export function compareId( memo_a : Memo, memo_b : Memo ) {
  if ( memo_a.Id < memo_b.Id ){
    return -1;
  }
  if ( memo_a.Id > memo_b.Id ){
    return 1;
  }
  return 0;
}
export function compareCreatedDate( memo_a : Memo, memo_b : Memo ) {
  if ( memo_a.CreatedDate < memo_b.CreatedDate ){
    return -1;
  }
  if ( memo_a.CreatedDate > memo_b.CreatedDate ){
    return 1;
  }
  return 0;
}
