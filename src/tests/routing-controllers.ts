
//=================//
// IMPORTS SECTION //
//=================//

import 'reflect-metadata';

import {Container, Service} from 'typedi';
import {createExpressServer, Get, JsonController} from 'routing-controllers';
import * as assert from 'assert';
import {Application} from 'express';
import {Server} from 'http';
import * as requestPromise from 'request-promise-native';


//==================//
// TYPE DEFINITIONS //
//==================//

@Service()
export class Car {
  public engineType: string;
  constructor () {
    this.engineType = 'V8';
  }
}

@JsonController()
export class CarController {

  constructor (private car: Car) {
  }

  @Get('/cars/1')
  public getCar () {
    return {
      engineType: this.car.engineType
    };
  }

}


//=======//
// TESTS //
//=======//

describe('TypeDI', function () {

  Container.reset();

  it('should return service from container', function () {

    // Getting car from the container directly.
    const car = Container.get(Car);
    assert.equal(car.engineType, 'V8');

  });

});

describe('routing-controllers', function () {

  Container.reset();

  it('should register controller as a service', function () {

    // Getting car controller from the container and calling it's method directly.
    const carCtrl = Container.get(CarController);
    assert.equal(carCtrl.getCar().engineType, 'V8');

  });

});

describe('routing-controllers controller injection', function () {

  Container.reset();

  let express: Application;
  let server: Server;

  before(callback => {
    express = createExpressServer();
    server = express.listen(8080, callback);
  });

  after(() => {
    server.close();
  });


  it('should work through server', function () {
    return requestPromise
      .get('http://localhost:8080/cars/1')
      .then(body => {
        body = JSON.parse(body);
        assert.equal(body.engineType, 'V8');
      })
    ;
  });

});
