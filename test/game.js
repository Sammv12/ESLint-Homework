/*
global beforeEach, it
*/

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

require('babel-register');
require('babel-polyfill');

const Game = require('../lib/game').default;

const describe = ('Game', function () {
  let game;

  describe('api', () => {
    beforeEach(() => {
      game = new Game();
    });

    it('should have isGameOver()', () => {
      game.should.respondTo('isGameOver');
    });

    it('should respondTo on()', () => {
      game.should.respondTo('on');
    });
  });

  describe('behavior', () => {
    beforeEach(() => {
      game = new Game();
    });

    describe('when the game is over', () => {
      beforeEach(() => {
        game.playField = {
          getSize: sinon.stub().returns(10),
          isEmptyAt: sinon.stub().returns(true),
        };
        game.playerHand = {
          getHandSize: sinon.stub().returns(0),
        };
      });

      it('should emit a "game-over" event', () => {
        const eventSpy = sinon.spy();
        game.on('game-over', eventSpy);

        game.checkEndGame();

        eventSpy.should.have.been.calledOnce;
      });
    });
  });
});
