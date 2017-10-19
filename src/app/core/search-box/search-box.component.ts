import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  public form: FormGroup;
  @Input() public toggle: Boolean = false;
  @Output() public update: EventEmitter<any> = new EventEmitter();
  @Output() public toggleEvent: EventEmitter<any> = new EventEmitter();
  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      text : ['', Validators.required],
      toggle: [false]
    });
  }
  OnToggleEvent() {
    this.toggleEvent.emit(!this.toggle);
  }
  submitForm() {
    if (this.form.invalid) {
      return;
    }
    this.update.emit(this.form.value);
    this.form.reset();
  }
}
