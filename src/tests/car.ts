
import {Service} from 'typedi';


@Service()
export class Car {
  public engineType: string;
  constructor () {
    this.engineType = 'V8';
  }
}
