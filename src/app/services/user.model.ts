import { Memo } from "../memo/memo.model";

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  memos: Memo[];
}
