import { Component, Input, OnInit, Output } from '@angular/core';
import { Ingredient, ingredientsArray } from 'src/app/shared/ingredients';
import { MemoIcon, MemoIcons } from '../memo-icons/memo-icons';
import {IMemo} from '../../interfaces/interfaces'

const MAX_WIDTH = "32rem";

@Component({
  selector: 'app-memo-item',
  templateUrl: './memo-item.component.html',
  styleUrls: ['./memo-item.component.scss']
})

export class MemoItemComponent implements OnInit {
  // herer we are exposing this particular object to "the world"
  @Input() public memo: IMemo;
  constructor() {
    this.memo = {
      Id: -1,
      Title: 'New Memo!',
      Description: 'Somet description!',
      MemoIcon: "📝",
      AddIngredients: false,
      EditMemo: false,
      DeleteMemo: false,
      Ingredients: []
    }
  }
  // for this component
  public max_width = MAX_WIDTH;
  public height = 0;
  public Id: number = -1;
  public _ingredients = ingredientsArray;
  public AddIngredients: boolean = false;
  public EditMemo: boolean = false;
  public DeleteMemo: boolean = false;
  public Icons = MemoIcons;
  public TextTest = '';
  public InputTextTest = '';
  public IsDisabled: boolean = false;
  public hasClicked: boolean = false;
  ngOnInit(): void {
    // setTimeout(() => {
    //   this.IsDisabled = false;
    // }, 2000);
    // throw new Error('Method not implemented.');
  }

  public ResetClick() {
setTimeout(() => {
  this.hasClicked = false;
}, 100);
  }

  public ChangeMemo(value: any, Id: number) {
    console.log("value in edit button: ", value);
    // console.log("value in memo: ", this.MemoList.find((m) => Id === m.Id));
  }
  public AddMemo(Title: string, Description: string, Icon: MemoIcon, Ingredients: Ingredient[]) {
    // const Id = this.MemoList.length + 1;
    // this.MemoList = [...this.MemoList,new Memo(Id,Title,Description,Icon,false,false,false,[...Ingredients])]
  }
  public RemoveMemo(Id: number) {
   console.log("this memos id: " , Id);
    // const objectIndex = this.MemoList.indexOf(memo, 0);
    // this.MemoList.splice(objectIndex, 1);
  }
  public UpdateInputText(e: Event) {
    // Telling angular that we know that this is an input element with explicit casting
    // works almost exactly like useRef() in React
    this.InputTextTest = (<HTMLInputElement>e.target).value
  }
  public GetColor() {
    return this.IsDisabled ? 'red' : 'green';
  };
}
