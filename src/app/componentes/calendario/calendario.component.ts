import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EventsService } from 'src/app/servicios/events.service';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  public model: NgbDateStruct;
  @Output() public dia = new EventEmitter;
  @Input() public profesional : any;
  constructor(public calendar: NgbCalendar, public eS: EventsService) {
  }

  selectToday() {
    this.model = this.calendar.getToday();
    this.onChange();
  }

  ngOnInit(): void {
  }
  onChange() {
    const dateString = this.model.month + '/' + this.model.day + '/' + this.model.year;
    let date = new Date(dateString);
    this.dia.emit(dateString);
    this.eS.date.emit();
  }
}
