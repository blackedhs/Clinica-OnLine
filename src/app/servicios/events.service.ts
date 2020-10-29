import { Injectable , EventEmitter} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EventsService {
  public date = new EventEmitter;
  constructor() { }
}
