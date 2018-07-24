const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const INITIAL_STRING = 'Hi there!';

beforeEach(async () => {
  // Get a list of all accounts
  // every function in web3 is asyncronous, get promise
  accounts = await web3.eth.getAccounts()

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: '1000000' });

  inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
  
  it('has a defaut message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] })
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
});


// class Car {
//   park() {+
//     return 'stopped';
//   }

//   drive() {
//     return 'vroom';
//   }
// }

// let car;

// beforeEach(() => {
//   car = new Car();
// });

// describe('Car', () => {
//   it('can drive', () => {
//     assert.equal(car.park(), 'stopped');
//   });

//   it('can drive', () => {
//     assert.equal(car.drive(), 'vroom');
//   });
// });