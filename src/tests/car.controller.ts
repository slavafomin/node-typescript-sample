
import {Get, JsonController} from 'routing-controllers';
import {Car} from './car';
import {Service} from 'typedi';


@JsonController()
@Service()
export class CarController {

  constructor (private car: Car) {
  }

  @Get('/cars/1')
  public getCar () {
    return {
      engineType: this.car.engineType
    };
  }

  @Get('/error')
  public getError () {
    throw new Error('Some error occurred');
  }

}
