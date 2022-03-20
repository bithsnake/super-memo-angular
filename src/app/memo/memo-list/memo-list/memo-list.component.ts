import { Component, OnInit } from '@angular/core';
import { MemoItemComponent } from '../../memo-item/memo-item.component';

@Component({
  selector: 'app-memo-list',
  templateUrl: './memo-list.component.html',
  styleUrls: ['./memo-list.component.scss']
})
export class MemoListComponent implements OnInit {

  memos  = [];

  constructor() { }

  ngOnInit() {
  }

}
