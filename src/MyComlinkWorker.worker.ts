import { expose } from "comlink";
import * as wrapper from "solc/wrapper";
// importScripts("https://binaries.soliditylang.org/bin/soljson-latest.js");
// const solc = wrapper((self as any).Module);
// console.log(solc, "solc");
declare const self: DedicatedWorkerGlobalScope;
export default {} as typeof Worker & { new (): Worker };

console.log("[MyComlinkWorker] Running.");
export interface SolcPayload {
  command: string;
  content: string;
}
export const api = {
  createMessage: (name: string): string => {
    return `Hello ${name}!`;
  },
  solidityCompiler: ({ content, command }: SolcPayload) => {
    console.log("loading solc", command);
    importScripts("https://binaries.soliditylang.org/bin/soljson-latest.js");
    console.log("finished solc");
    const solc = wrapper((self as any).Module);
    var input = {
      language: "Solidity",
      sources: {
        "contract.sol": {
          content,
        },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["*"],
          },
        },
      },
    };

    return solc.compile(JSON.stringify(input));
  },
};

expose(api);
