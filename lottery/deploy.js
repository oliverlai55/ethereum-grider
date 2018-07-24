const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'winter rival they ridge check sick quick welcome ostrich this kiss armed',
  'https://rinkeby.infura.io/G2oZGKoaENK7hn2p7Cbs'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    // .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .deploy({ data: '0x' + bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();