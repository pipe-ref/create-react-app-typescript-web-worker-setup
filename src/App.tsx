import React from 'react';
import logo from './logo.svg';
import './App.css';

import MyWorker from './MyWorker.worker';
import MyComlinkWorker, { api } from './MyComlinkWorker.worker';
import { wrap } from 'comlink';

// Example: Using workers natively, e.g. by using "postMessage()"
const myWorkerInstance: Worker = new MyWorker();
console.log('[App] MyWorker instance:', myWorkerInstance);
myWorkerInstance.postMessage('This is a message from the main thread!');

// Example: Using workers via Comlink (comparable to remote execution)
const myComlinkWorkerInstance: Worker = new MyComlinkWorker();
const myComlinkWorkerApi = wrap<typeof api>(myComlinkWorkerInstance);
console.log('[App] MyComlinkWorker instance:', myComlinkWorkerInstance);
myComlinkWorkerApi.createMessage('John Doe').then((message: string): void => {
  console.log('[App] MyComlinkWorker message:', message);
});
const SimpleStorageContact = `
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;
contract SimpleStorage {
    uint storedData;
    function set(uint x) public {
        storedData = x;
    }
    function get() public view returns (uint) {
        return storedData;
    }
}
`;
myComlinkWorkerApi.solidityCompiler({ command: '', content: SimpleStorageContact }).then((solcResult: string): void => {
  // console.log(solcResult)
  var output = JSON.parse(solcResult);

  // `output` here contains the JSON output as specified in the documentation
  for (var contractName in output.contracts['contract.sol']) {
    console.log(
      contractName +
      ': ' +
      JSON.stringify(output.contracts['contract.sol'][contractName].evm.bytecode)
      , output.contracts['contract.sol'][contractName]);
  }
})

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
