import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit{

  private debouncer: Subject<string> = new Subject<string>();

  @Input()
  public placeholder: string = '';

//Para cuando queremos que la consulta se lance pulsando enter
  // @Output()
  // public onValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      this.onDebounce.emit(value);
    });
  }

  //Para cuando queremos que la consulta se lance pulsando enter
  // emitValue(value: string): void {
  //   this.onValue.emit(value);
  // }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }

}
