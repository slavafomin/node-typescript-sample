
//=================//
// IMPORTS SECTION //
//=================//

//noinspection TsLint
import 'reflect-metadata';

import {Container} from 'typedi';
import {useContainer, useExpressServer} from 'routing-controllers';
import * as assert from 'assert';
import * as requestPromise from 'request-promise-native';
import {createServer, Server} from 'restify';


//==================//
// TYPE DEFINITIONS //
//==================//

useContainer(Container);

import {Car} from './car';
import {CarController} from './car.controller';


//=======//
// TESTS //
//=======//

describe('Restify Suite', function () {

  describe('TypeDI', function () {

    it('should return service from container', function () {

      // Getting car from the container directly.
      const car = Container.get(Car);
      assert.equal(car.engineType, 'V8');

    });

  });

  describe('routing-controllers', function () {

    it('should register controller as a service', function () {

      // Getting car controller from the container and calling it's method directly.
      const carCtrl = Container.get(CarController);
      assert.equal(carCtrl.getCar().engineType, 'V8');

    });

  });

  describe('routing-controllers controller injection', function () {

    let server: Server;

    before(callback => {
      server = createServer();
      useExpressServer(server, {
        defaultErrorHandler: false,
        middlewares: [
          __dirname + '/middleware/*.js'
        ]
      });
      server.listen(8080, callback);
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

    it('should support custom error handler', function () {
      return requestPromise
        .get('http://localhost:8080/error')
        .then(body => {
          console.log(body);
        })
      ;
    });

  });

});
