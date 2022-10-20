// Automatically generated with Reach 0.1.12 (ae94865f)
/* eslint-disable */
export const _version = '0.1.12';
export const _versionHash = '0.1.12 (ae94865f)';
export const _backendVersion = 24;

export function getExports(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getEvents(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getViews(s, viewlib) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '128'));
  const ctc1 = stdlib.T_Address;
  const ctc2 = stdlib.T_UInt;
  const ctc3 = stdlib.T_Struct([['name', ctc0], ['buyerAddress', ctc1], ['supplierAddress', ctc1], ['state', ctc2]]);
  const ctc4 = stdlib.T_Contract;
  const ctc5 = stdlib.T_Array(ctc4, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '10'));
  
  const Explorer_deliveredNetworkTime = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [v256, v257, v280, v281] = svs;
      return (await ((async () => {
        
        
        return v257;}))(...args));
      }
    
    stdlib.assert(false, 'illegal view')
    };
  const Explorer_deployedNetworkTime = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [v256, v257, v280, v281] = svs;
      return (await ((async () => {
        
        
        return v257;}))(...args));
      }
    
    stdlib.assert(false, 'illegal view')
    };
  const Explorer_details = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [v256, v257, v280, v281] = svs;
      return (await ((async () => {
        
        
        return v256;}))(...args));
      }
    
    stdlib.assert(false, 'illegal view')
    };
  const Explorer_listOfIngredients = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [v256, v257, v280, v281] = svs;
      return (await ((async () => {
        
        
        return v281;}))(...args));
      }
    
    stdlib.assert(false, 'illegal view')
    };
  const Explorer_rejectReason = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [v256, v257, v280, v281] = svs;
      return (await ((async () => {
        
        const v265 = 'Too salty. I Reject                                                                                                             ';
        
        return v265;}))(...args));
      }
    
    stdlib.assert(false, 'illegal view')
    };
  const Explorer_reviewedNetworkTime = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [v256, v257, v280, v281] = svs;
      return (await ((async () => {
        
        
        return v257;}))(...args));
      }
    
    stdlib.assert(false, 'illegal view')
    };
  return {
    infos: {
      Explorer: {
        deliveredNetworkTime: {
          decode: Explorer_deliveredNetworkTime,
          dom: [],
          rng: ctc2
          },
        deployedNetworkTime: {
          decode: Explorer_deployedNetworkTime,
          dom: [],
          rng: ctc2
          },
        details: {
          decode: Explorer_details,
          dom: [],
          rng: ctc3
          },
        listOfIngredients: {
          decode: Explorer_listOfIngredients,
          dom: [],
          rng: ctc5
          },
        rejectReason: {
          decode: Explorer_rejectReason,
          dom: [],
          rng: ctc0
          },
        reviewedNetworkTime: {
          decode: Explorer_reviewedNetworkTime,
          dom: [],
          rng: ctc2
          }
        }
      },
    views: {
      3: [ctc3, ctc2, ctc2, ctc5]
      }
    };
  
  };
export function _getMaps(s) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Tuple([]);
  return {
    mapDataTy: ctc0
    };
  };
export async function Buyer(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Buyer expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Buyer expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '128'));
  const ctc1 = stdlib.T_Address;
  const ctc2 = stdlib.T_UInt;
  const ctc3 = stdlib.T_Struct([['name', ctc0], ['buyerAddress', ctc1], ['supplierAddress', ctc1], ['state', ctc2]]);
  const ctc4 = stdlib.T_Null;
  const ctc5 = stdlib.T_Contract;
  const ctc6 = stdlib.T_Tuple([ctc5]);
  
  
  const v248 = stdlib.protect(ctc3, interact.details, 'for Buyer\'s interact field details');
  
  const txn1 = await (ctc.sendrecv({
    args: [v248],
    evt_cnt: 1,
    funcNum: 0,
    lct: stdlib.checkedBigNumberify('./index.rsh:56:11:dot', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc3],
    pay: [stdlib.checkedBigNumberify('./index.rsh:56:11:decimal', stdlib.UInt_max, '0'), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v256], secs: v258, time: v257, didSend: v31, from: v255 } = txn1;
      
      ;
      const v259 = await ctc.getContractInfo();
      
      const v279 = [v259, v259, v259, v259, v259, v259, v259, v259, v259, v259];
      const v280 = stdlib.checkedBigNumberify('./index.rsh:79:51:decimal', stdlib.UInt_max, '0');
      const v281 = v279;
      const v282 = v257;
      
      if (await (async () => {
        
        return true;})()) {
        sim_r.isHalt = false;
        }
      else {
        sim_r.txns.push({
          kind: 'halt',
          tok: undefined /* Nothing */
          })
        sim_r.isHalt = true;
        }
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined /* mto */,
    tys: [ctc3],
    waitIfNotPresent: false
    }));
  const {data: [v256], secs: v258, time: v257, didSend: v31, from: v255 } = txn1;
  ;
  const v259 = await ctc.getContractInfo();
  stdlib.protect(ctc4, await interact.launched(v259), {
    at: './index.rsh:57:28:application',
    fs: ['at ./index.rsh:57:28:application call to [unknown function] (defined at: ./index.rsh:57:28:function exp)', 'at ./index.rsh:57:28:application call to "liftedInteract" (defined at: ./index.rsh:57:28:application)'],
    msg: 'launched',
    who: 'Buyer'
    });
  
  const v279 = [v259, v259, v259, v259, v259, v259, v259, v259, v259, v259];
  let v280 = stdlib.checkedBigNumberify('./index.rsh:79:51:decimal', stdlib.UInt_max, '0');
  let v281 = v279;
  let v282 = v257;
  
  let txn2 = txn1;
  while (await (async () => {
    
    return true;})()) {
    const txn3 = await (ctc.recv({
      didSend: false,
      evt_cnt: 1,
      funcNum: 2,
      out_tys: [ctc6],
      timeoutAt: undefined /* mto */,
      waitIfNotPresent: false
      }));
    const {data: [v332], secs: v334, time: v333, didSend: v191, from: v331 } = txn3;
    undefined /* setApiDetails */;
    const v336 = v332[stdlib.checkedBigNumberify('./index.rsh:85:14:spread', stdlib.UInt_max, '0')];
    const v337 = stdlib.lt(v280, stdlib.checkedBigNumberify('./index.rsh:86:28:decimal', stdlib.UInt_max, '10'));
    stdlib.assert(v337, {
      at: 'reach standard library:57:5:application',
      fs: ['at ./index.rsh:86:18:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:85:49:application call to [unknown function] (defined at: ./index.rsh:85:49:function exp)', 'at ./index.rsh:85:49:application call to [unknown function] (defined at: ./index.rsh:85:49:function exp)'],
      msg: 'Number of ingredients cannot exceed 10',
      who: 'Buyer'
      });
    ;
    const v343 = null;
    await txn3.getOutput('Seller_addIngredient', 'v343', ctc4, v343);
    const v351 = stdlib.Array_set(v281, v280, v336);
    const v352 = stdlib.safeAdd(v280, stdlib.checkedBigNumberify('./index.rsh:90:76:decimal', stdlib.UInt_max, '1'));
    const cv280 = v352;
    const cv281 = v351;
    const cv282 = v333;
    
    v280 = cv280;
    v281 = cv281;
    v282 = cv282;
    
    txn2 = txn3;
    continue;
    
    }
  return;
  
  
  };
export async function _Seller_addIngredient3(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _Seller_addIngredient3 expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for _Seller_addIngredient3 expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '128'));
  const ctc1 = stdlib.T_Address;
  const ctc2 = stdlib.T_UInt;
  const ctc3 = stdlib.T_Struct([['name', ctc0], ['buyerAddress', ctc1], ['supplierAddress', ctc1], ['state', ctc2]]);
  const ctc4 = stdlib.T_Contract;
  const ctc5 = stdlib.T_Array(ctc4, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '10'));
  const ctc6 = stdlib.T_Tuple([ctc4]);
  const ctc7 = stdlib.T_Null;
  
  
  const [v256, v257, v280, v281] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [ctc3, ctc2, ctc2, ctc5]);
  const v320 = stdlib.protect(ctc6, await interact.in(), {
    at: './index.rsh:1:23:application',
    fs: ['at ./index.rsh:85:49:application call to [unknown function] (defined at: ./index.rsh:85:49:function exp)', 'at ./index.rsh:85:49:application call to [unknown function] (defined at: ./index.rsh:85:49:function exp)'],
    msg: 'in',
    who: 'Seller_addIngredient'
    });
  const v323 = stdlib.lt(v280, stdlib.checkedBigNumberify('./index.rsh:86:28:decimal', stdlib.UInt_max, '10'));
  stdlib.assert(v323, {
    at: 'reach standard library:57:5:application',
    fs: ['at ./index.rsh:86:18:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:85:49:application call to [unknown function] (defined at: ./index.rsh:85:49:function exp)', 'at ./index.rsh:85:49:application call to [unknown function] (defined at: ./index.rsh:85:49:function exp)'],
    msg: 'Number of ingredients cannot exceed 10',
    who: 'Seller_addIngredient'
    });
  
  const txn1 = await (ctc.sendrecv({
    args: [v256, v257, v280, v281, v320],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc6],
    pay: [stdlib.checkedBigNumberify('./index.rsh:88:22:decimal', stdlib.UInt_max, '0'), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v332], secs: v334, time: v333, didSend: v191, from: v331 } = txn1;
      
      sim_r.txns.push({
        kind: 'api',
        who: "Seller_addIngredient"
        });
      const v336 = v332[stdlib.checkedBigNumberify('./index.rsh:85:14:spread', stdlib.UInt_max, '0')];
      ;
      const v343 = null;
      const v344 = await txn1.getOutput('Seller_addIngredient', 'v343', ctc7, v343);
      
      const v351 = stdlib.Array_set(v281, v280, v336);
      const v352 = stdlib.safeAdd(v280, stdlib.checkedBigNumberify('./index.rsh:90:76:decimal', stdlib.UInt_max, '1'));
      const v432 = v352;
      const v433 = v351;
      sim_r.isHalt = false;
      
      return sim_r;
      }),
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [ctc3, ctc2, ctc2, ctc5, ctc6],
    waitIfNotPresent: false
    }));
  const {data: [v332], secs: v334, time: v333, didSend: v191, from: v331 } = txn1;
  undefined /* setApiDetails */;
  const v336 = v332[stdlib.checkedBigNumberify('./index.rsh:85:14:spread', stdlib.UInt_max, '0')];
  const v337 = stdlib.lt(v280, stdlib.checkedBigNumberify('./index.rsh:86:28:decimal', stdlib.UInt_max, '10'));
  stdlib.assert(v337, {
    at: 'reach standard library:57:5:application',
    fs: ['at ./index.rsh:86:18:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:85:49:application call to [unknown function] (defined at: ./index.rsh:85:49:function exp)', 'at ./index.rsh:85:49:application call to [unknown function] (defined at: ./index.rsh:85:49:function exp)'],
    msg: 'Number of ingredients cannot exceed 10',
    who: 'Seller_addIngredient'
    });
  ;
  const v343 = null;
  const v344 = await txn1.getOutput('Seller_addIngredient', 'v343', ctc7, v343);
  if (v191) {
    stdlib.protect(ctc7, await interact.out(v332, v344), {
      at: './index.rsh:85:15:application',
      fs: ['at ./index.rsh:85:15:application call to [unknown function] (defined at: ./index.rsh:85:15:function exp)', 'at ./index.rsh:89:20:application call to "ret" (defined at: ./index.rsh:88:30:function exp)', 'at ./index.rsh:88:30:application call to [unknown function] (defined at: ./index.rsh:88:30:function exp)'],
      msg: 'out',
      who: 'Seller_addIngredient'
      });
    }
  else {
    }
  
  const v351 = stdlib.Array_set(v281, v280, v336);
  const v352 = stdlib.safeAdd(v280, stdlib.checkedBigNumberify('./index.rsh:90:76:decimal', stdlib.UInt_max, '1'));
  const v432 = v352;
  const v433 = v351;
  return;
  
  
  
  };
export async function Seller_addIngredient(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Seller_addIngredient expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Seller_addIngredient expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep()
  if (step == 3) {return _Seller_addIngredient3(ctcTop, interact);}
  throw stdlib.apiStateMismatchError({ _stateSourceMap }, [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3')], stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step))
  };
const _ALGO = {
  ABI: {
    impure: [`Seller_addIngredient(uint64)byte[0]`],
    pure: [`Explorer_deliveredNetworkTime()uint64`, `Explorer_deployedNetworkTime()uint64`, `Explorer_details()(byte[128],address,address,uint64)`, `Explorer_listOfIngredients()uint64[10]`, `Explorer_rejectReason()byte[128]`, `Explorer_reviewedNetworkTime()uint64`],
    sigs: [`Explorer_deliveredNetworkTime()uint64`, `Explorer_deployedNetworkTime()uint64`, `Explorer_details()(byte[128],address,address,uint64)`, `Explorer_listOfIngredients()uint64[10]`, `Explorer_rejectReason()byte[128]`, `Explorer_reviewedNetworkTime()uint64`, `Seller_addIngredient(uint64)byte[0]`]
    },
  appApproval: `ByALAAMBCOzBneQGxOaxjw2ZxPiSDYG8jOUHt57KjQWWp/SxBQImBAEAAQEBAgAiNQAxGEECzitkSSJbNQElWzUCNhoAF0lBAVsiNQQkNQZJIQQMQAD6SSEFDEAAP0khBgxAABwhBhJENAEjEkQoZClkUCpkUEk1A1fICDUHQgJ8IQUSRDQBIxJEKGQpZFAqZFBJNQNXyAg1B0ICYEkhBwxAAJEhBxJENAEjEkSAgAFUb28gc2FsdHkuIEkgUmVqZWN0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADUHQgHIIQQSRDQBIxJEKGQpZFAqZFBJNQNXAMg1B0IBrEkhCAxAAC1JIQkMQAAcIQkSRDQBIxJEKGQpZFAqZFBJNQNX2FA1B0IBgiEIEkQ2GgFCADiB5d7irgMSRDQBIxJEKGQpZFAqZFBJNQNXyAg1B0IBWDYaAhc1BDYaAzYaARdJIQoMQABoIQoSRCM0ARJENARJIhJMNAISEUQoZClkUCpkUEk1A4HQAVs1/0k1BTX+gAQchk/lNP5QsDT/gQoMRIAIAAAAAAAAAVewKzUHNANXAMg0A4HIAVs0/yQINANX2FA0/yULNP5dMgZCAF4iEkSBoI0GiAD4IjQBEkQ0BEkiEkw0AhIRREk1BTX/gAQd0Fw6NP9QsDEYNf40/zIGIjT+FjT+FlA0/hZQNP4WUDT+FlA0/hZQNP4WUDT+FlA0/hZQNP4WUDIGQgAANf81/jX9NfxJNfs0/BZQNP0WUDT+UChLAVcAf2cpSwFXf39nKksBV/4qZ0gjNQEyBjUCQgAcMRmBBRJEsSKyASKyCCSyEDIJsgkyCrIHs0IABTEZIhJEKzQBFjQCFlBnNAZBAAqABBUffHU0B1CwNABJJAgyBBJEMRYSRCRDMRkiEkRC/98iMTQSRIEEMTUSRCIxNhJEIjE3EkQiNQEiNQJC/640AElKJAg1ADgHMgoSRDgQJBJEOAgSRIk=`,
  appClear: `Bw==`,
  companionInfo: null,
  extraPages: 0,
  mapDataKeys: 0,
  mapDataSize: 0,
  stateKeys: 3,
  stateSize: 296,
  unsupported: [],
  version: 11,
  warnings: []
  };
const _ETH = {
  ABI: `[
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "components": [
                      {
                        "internalType": "bytes32",
                        "name": "elem0",
                        "type": "bytes32"
                      },
                      {
                        "internalType": "bytes32",
                        "name": "elem1",
                        "type": "bytes32"
                      },
                      {
                        "internalType": "bytes32",
                        "name": "elem2",
                        "type": "bytes32"
                      },
                      {
                        "internalType": "bytes32",
                        "name": "elem3",
                        "type": "bytes32"
                      }
                    ],
                    "internalType": "struct T1",
                    "name": "name",
                    "type": "tuple"
                  },
                  {
                    "internalType": "address payable",
                    "name": "buyerAddress",
                    "type": "address"
                  },
                  {
                    "internalType": "address payable",
                    "name": "supplierAddress",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "state",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct T2",
                "name": "v256",
                "type": "tuple"
              }
            ],
            "internalType": "struct T8",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T9",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "msg",
        "type": "uint256"
      }
    ],
    "name": "ReachError",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "components": [
                      {
                        "internalType": "bytes32",
                        "name": "elem0",
                        "type": "bytes32"
                      },
                      {
                        "internalType": "bytes32",
                        "name": "elem1",
                        "type": "bytes32"
                      },
                      {
                        "internalType": "bytes32",
                        "name": "elem2",
                        "type": "bytes32"
                      },
                      {
                        "internalType": "bytes32",
                        "name": "elem3",
                        "type": "bytes32"
                      }
                    ],
                    "internalType": "struct T1",
                    "name": "name",
                    "type": "tuple"
                  },
                  {
                    "internalType": "address payable",
                    "name": "buyerAddress",
                    "type": "address"
                  },
                  {
                    "internalType": "address payable",
                    "name": "supplierAddress",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "state",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct T2",
                "name": "v256",
                "type": "tuple"
              }
            ],
            "internalType": "struct T8",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T9",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e0",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "address payable",
                    "name": "elem0",
                    "type": "address"
                  }
                ],
                "internalType": "struct T10",
                "name": "v332",
                "type": "tuple"
              }
            ],
            "internalType": "struct T11",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T12",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e2",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bool",
        "name": "v0",
        "type": "bool"
      }
    ],
    "name": "_reach_oe_v343",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "name": "Explorer_deliveredNetworkTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "Explorer_deployedNetworkTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "Explorer_details",
    "outputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "bytes32",
                "name": "elem0",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem1",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem2",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "elem3",
                "type": "bytes32"
              }
            ],
            "internalType": "struct T1",
            "name": "name",
            "type": "tuple"
          },
          {
            "internalType": "address payable",
            "name": "buyerAddress",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "supplierAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "state",
            "type": "uint256"
          }
        ],
        "internalType": "struct T2",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "Explorer_listOfIngredients",
    "outputs": [
      {
        "internalType": "address payable[10]",
        "name": "",
        "type": "address[10]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "Explorer_rejectReason",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "elem0",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "elem1",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "elem2",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "elem3",
            "type": "bytes32"
          }
        ],
        "internalType": "struct T1",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "Explorer_reviewedNetworkTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_a0",
        "type": "address"
      }
    ],
    "name": "Seller_addIngredient",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCreationTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentState",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "address payable",
                    "name": "elem0",
                    "type": "address"
                  }
                ],
                "internalType": "struct T10",
                "name": "v332",
                "type": "tuple"
              }
            ],
            "internalType": "struct T11",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T12",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m2",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]`,
  Bytecode: `0x60806040526040516200182f3803806200182f8339810160408190526200002691620004a0565b600080554360035562000038620001fc565b7f9ae602065b7e32db5a7014cc1366eaa50adc6516c784165ac6c2858b34c4bdc033836040516200006b92919062000575565b60405180910390a1620000813415600d6200015b565b308082526020808301805192909252825182516001600160a01b039182169201919091528251825190821660409091015282518251908216606090910152825182519082166080909101528251825190821660a0909101528251825190821660c0909101528251825190821660e0909101528251825190821661010090910152825191519116610120909101526200011862000226565b6020808401515182515281514390820181905282820180516000905284830151815190930192909252905160400152620001528162000185565b505050620006d5565b81620001815760405163100960cb60e01b81526004810182905260240160405180910390fd5b5050565b6200018f6200024a565b81515181528151602090810151818301528083018051516040808501919091529051820151606084015260036000554360015551620001d191839101620005f3565b60405160208183030381529060405260029080519060200190620001f7929190620002b4565b505050565b604051806040016040528060006001600160a01b031681526020016200022162000343565b905290565b60405180604001604052806200023b62000362565b815260200162000221620003b7565b604080516101808101909152600061010082018181526101208301829052610140830182905261016083018290526080830190815260a0830182905260c0830182905260e08301919091528190815260200160008152602001600081526020016200022162000343565b828054620002c29062000698565b90600052602060002090601f016020900481019282620002e6576000855562000331565b82601f106200030157805160ff191683800117855562000331565b8280016001018555821562000331579182015b828111156200033157825182559160200191906001019062000314565b506200033f929150620003d3565b5090565b604051806101400160405280600a906020820280368337509192915050565b6040805161014081018252600060c0820181815260e0830182905261010083018290526101208301829052928201928352606082018190526080820181905260a08201529081905b8152602001600081525090565b604051806060016040528060008152602001620003aa62000343565b5b808211156200033f5760008155600101620003d4565b604080519081016001600160401b03811182821017156200041b57634e487b7160e01b600052604160045260246000fd5b60405290565b604051602081016001600160401b03811182821017156200041b57634e487b7160e01b600052604160045260246000fd5b604051608081016001600160401b03811182821017156200041b57634e487b7160e01b600052604160045260246000fd5b80516001600160a01b03811681146200049b57600080fd5b919050565b6000818303610100811215620004b557600080fd5b620004bf620003ea565b83518152601f198201915060e0821215620004d957600080fd5b620004e362000421565b620004ed62000452565b6080841215620004fc57600080fd5b6200050662000452565b9350602086015184526040860151602085015260608601516040850152608086015160608501528381526200053e60a0870162000483565b60208201526200055160c0870162000483565b604082015260e0959095015160608601529384526020810193909352509092915050565b60006101208201905060018060a01b0384168252825160208301526020830151620005eb604084018251805180518352602080820151818501526040808301518186015260609283015183860152908301516001600160a01b039081166080860152908301511660a0840152015160c090910152565b509392505050565b8151805180518352602080820151818501526040808301518186015260609283015183860152908301516001600160a01b039081166080860152908301511660a0840152015160c0820152610260810160208084015160e084015260408401516101008401526060840151610120840160005b600a8110156200068e5782516001600160a01b03168252918301919083019060010162000666565b5050505092915050565b600181811c90821680620006ad57607f821691505b60208210811415620006cf57634e487b7160e01b600052602260045260246000fd5b50919050565b61114a80620006e56000396000f3fe60806040526004361061009a5760003560e01c8063832307571161006157806383230757146101375780638e4ad75f1461014c578063ab53f2c61461016e578063bd7ce41014610191578063c016489f146101a6578063dae16031146101c957005b8063196c99be146100a35780631e93b0f1146100ce57806369afda47146100ed57806373e758ed1461010057806379a7e9b71461012257005b366100a157005b005b3480156100af57600080fd5b506100b86101de565b6040516100c59190610c67565b60405180910390f35b3480156100da57600080fd5b506003545b6040519081526020016100c5565b6100a16100fb366004610c92565b610211565b34801561010c57600080fd5b5061011561023c565b6040516100c59190610d02565b34801561012e57600080fd5b506100df61024f565b34801561014357600080fd5b506001546100df565b34801561015857600080fd5b5061016161025b565b6040516100c59190610d10565b34801561017a57600080fd5b5061018361026e565b6040516100c5929190610d4b565b34801561019d57600080fd5b506100df61030b565b6101b96101b4366004610dc0565b610317565b60405190151581526020016100c5565b3480156101d557600080fd5b506100df610328565b60408051608081018252600080825260208201819052918101829052606081018290529061020b81610334565b91505090565b60408051602081019091526000815261023861023236849003840184610e46565b8261047f565b5050565b610244610ab2565b600061020b81610669565b60008061020b81610730565b610263610af5565b600061020b816107f4565b60006060600054600280805461028390610ec8565b80601f01602080910402602001604051908101604052809291908181526020018280546102af90610ec8565b80156102fc5780601f106102d1576101008083540402835291602001916102fc565b820191906000526020600020905b8154815290600101906020018083116102df57829003601f168201915b50505050509050915091509091565b60008061020b816108be565b6000610322826108e6565b92915050565b60008061020b8161091a565b604080516080810182526000808252602082018190529181018290526060810182905290546003141561046e5760006002805461037090610ec8565b80601f016020809104026020016040519081016040528092919081815260200182805461039c90610ec8565b80156103e95780601f106103be576101008083540402835291602001916103e9565b820191906000526020600020905b8154815290600101906020018083116103cc57829003601f168201915b50505050508060200190518101906104019190610f7f565b90506104316040805160a08101825260006020820181815292820181905260608201819052608082015290815290565b805172151bdbc81cd85b1d1e4b88124814995a9958dd606a1b90528051600060209091018190528151604001819052815160600152519392505050565b61047a6000600b61093e565b919050565b61048f600360005414601061093e565b81516104aa9015806104a357508251600154145b601161093e565b6000808055600280546104bc90610ec8565b80601f01602080910402602001604051908101604052809291908181526020018280546104e890610ec8565b80156105355780601f1061050a57610100808354040283529160200191610535565b820191906000526020600020905b81548152906001019060200180831161051857829003601f168201915b505050505080602001905181019061054d9190610f7f565b60408051338152855160208083019190915286015151516001600160a01b03168183015290519192507f397fbf74ee760faaaf416e26711cae0f761d205a28047865f4cb3b3fdc062bbc919081900360600190a16105b3600a826040015110600e61093e565b6105bf3415600f61093e565b604051600081527f2be37cd4d1babf8837a9e40ff8c09939a6fbf5513bb2a46fbc982c7bb26d7a129060200160405180910390a1600082526105ff610b19565b81518151526020808301518251909101526040820151610620906001610964565b602080830151919091526060830151604084015191860151515161064492906109b1565b6020808301805190910191909152514360409091015261066381610a41565b50505050565b610671610ab2565b600360005414156107245760006002805461068b90610ec8565b80601f01602080910402602001604051908101604052809291908181526020018280546106b790610ec8565b80156107045780601f106106d957610100808354040283529160200191610704565b820191906000526020600020905b8154815290600101906020018083116106e757829003601f168201915b505050505080602001905181019061071c9190610f7f565b519392505050565b61047a6000600961093e565b6000600360005414156107e85760006002805461074c90610ec8565b80601f016020809104026020016040519081016040528092919081815260200182805461077890610ec8565b80156107c55780601f1061079a576101008083540402835291602001916107c5565b820191906000526020600020905b8154815290600101906020018083116107a857829003601f168201915b50505050508060200190518101906107dd9190610f7f565b602001519392505050565b61047a6000600c61093e565b6107fc610af5565b600360005414156108b25760006002805461081690610ec8565b80601f016020809104026020016040519081016040528092919081815260200182805461084290610ec8565b801561088f5780601f106108645761010080835404028352916020019161088f565b820191906000526020600020905b81548152906001019060200180831161087257829003601f168201915b50505050508060200190518101906108a79190610f7f565b606001519392505050565b61047a6000600a61093e565b6000600360005414156108da5760006002805461074c90610ec8565b61047a6000600861093e565b60006108f0610b39565b602080820151516001600160a01b03851690526040805191820190526000815261071c828261047f565b6000600360005414156109365760006002805461074c90610ec8565b61047a600060075b816102385760405163100960cb60e01b8152600481018290526024015b60405180910390fd5b6000826109718382611064565b91508110156103225760405162461bcd60e51b815260206004820152600c60248201526b616464206f766572666c6f7760a01b604482015260640161095b565b6109b9610af5565b60005b600a811015610a13578481600a81106109d7576109d761107c565b60200201518282600a81106109ee576109ee61107c565b6001600160a01b03909216602092909202015280610a0b81611092565b9150506109bc565b50818184600a8110610a2757610a2761107c565b6001600160a01b0390921660209290920201529392505050565b610a49610b66565b81515181528151602090810151818301528083018051516040808501919091529051820151606084015260036000554360015551610a89918391016110ad565b60405160208183030381529060405260029080519060200190610aad929190610b94565b505050565b604080516101008101825260006080820181815260a0830182905260c0830182905260e08301829052825260208201819052918101829052606081019190915290565b604051806101400160405280600a906020820280368337509192915050565b905290565b6040518060400160405280610b2c610c18565b8152602001610b14610c38565b604051806040016040528060008152602001610b1460408051808201909152600060208201908152815290565b6040518060800160405280610b79610ab2565b81526020016000815260200160008152602001610b14610af5565b828054610ba090610ec8565b90600052602060002090601f016020900481019282610bc25760008555610c08565b82601f10610bdb57805160ff1916838001178555610c08565b82800160010185558215610c08579182015b82811115610c08578251825591602001919060010190610bed565b50610c14929150610c52565b5090565b6040518060400160405280610c2b610ab2565b8152602001600081525090565b604051806060016040528060008152602001610c2b610af5565b5b80821115610c145760008155600101610c53565b8151815260208083015190820152604080830151908201526060808301519082015260808101610322565b600060408284031215610ca457600080fd5b50919050565b610cd6828251805182526020810151602083015260408101516040830152606081015160608301525050565b60208101516001600160a01b03908116608084015260408201511660a08301526060015160c090910152565b60e081016103228284610caa565b6101408101818360005b600a811015610d425781516001600160a01b0316835260209283019290910190600101610d1a565b50505092915050565b82815260006020604081840152835180604085015260005b81811015610d7f57858101830151858201606001528201610d63565b81811115610d91576000606083870101525b50601f01601f191692909201606001949350505050565b6001600160a01b0381168114610dbd57600080fd5b50565b600060208284031215610dd257600080fd5b8135610ddd81610da8565b9392505050565b634e487b7160e01b600052604160045260246000fd5b6040516020810167ffffffffffffffff81118282101715610e1d57610e1d610de4565b60405290565b6040516080810167ffffffffffffffff81118282101715610e1d57610e1d610de4565b60008183036040811215610e5957600080fd5b6040516040810181811067ffffffffffffffff82111715610e7c57610e7c610de4565b604052833581526020601f1983011215610e9557600080fd5b610e9d610dfa565b9150610ea7610dfa565b6020850135610eb581610da8565b8152825260208101919091529392505050565b600181811c90821680610edc57607f821691505b60208210811415610ca457634e487b7160e01b600052602260045260246000fd5b805161047a81610da8565b600082601f830112610f1957600080fd5b60405161014080820182811067ffffffffffffffff82111715610f3e57610f3e610de4565b60405283018185821115610f5157600080fd5b845b82811015610f74578051610f6681610da8565b825260209182019101610f53565b509195945050505050565b6000818303610260811215610f9357600080fd5b610f9b610e23565b60e0821215610fa957600080fd5b610fb1610e23565b6080831215610fbf57600080fd5b610fc7610e23565b925084518352602085015160208401526040850151604084015260608501516060840152828152610ffa60808601610efd565b602082015261100b60a08601610efd565b604082015260c085015160608201528082525060e084015160208201526101008401516040820152611041856101208601610f08565b6060820152949350505050565b634e487b7160e01b600052601160045260246000fd5b600082198211156110775761107761104e565b500190565b634e487b7160e01b600052603260045260246000fd5b60006000198214156110a6576110a661104e565b5060010190565b6000610260820190506110c1828451610caa565b60208084015160e084015260408401516101008401526060840151610120840160005b600a81101561110a5782516001600160a01b0316825291830191908301906001016110e4565b505050509291505056fea2646970667358221220ba644a566dca8812df5a660bb20e7b4d1f1f0dba50790cdf8173a5ecee39a53364736f6c634300080c0033`,
  BytecodeLen: 6191,
  Which: `oD`,
  version: 8,
  views: {
    Explorer: {
      deliveredNetworkTime: `Explorer_deliveredNetworkTime`,
      deployedNetworkTime: `Explorer_deployedNetworkTime`,
      details: `Explorer_details`,
      listOfIngredients: `Explorer_listOfIngredients`,
      rejectReason: `Explorer_rejectReason`,
      reviewedNetworkTime: `Explorer_reviewedNetworkTime`
      }
    }
  };
export const _stateSourceMap = {
  2: {
    at: './index.rsh:94:13:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  3: {
    at: './index.rsh:79:23:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    }
  };
export const _Connectors = {
  ALGO: _ALGO,
  ETH: _ETH
  };
export const _Participants = {
  "Buyer": Buyer,
  "Seller_addIngredient": Seller_addIngredient
  };
export const _APIs = {
  Seller: {
    addIngredient: Seller_addIngredient
    }
  };
