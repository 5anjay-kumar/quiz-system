import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class EmitterService {
  private eventEmitters: { [ID: string]: Subject<any> } = {};

  get(ID: string): Subject<any> {
    if (!this.eventEmitters[ID]) {
      this.eventEmitters[ID] = new Subject();
    }
    return this.eventEmitters[ID];
  }

  emit(ID: string, data?: any) {
    if (this.eventEmitters[ID]) {
      this.eventEmitters[ID].next(data);
    }
  }

  subscribe(ID: string, callBack: (data?: any) => any) {
    this.get(ID).subscribe(callBack);
  }

  unsubscribe(ID: string) {
    if (this.eventEmitters[ID]) {
      this.eventEmitters[ID].unsubscribe();
      delete this.eventEmitters[ID];
    }
  }
}
