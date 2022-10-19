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
  const ctc2 = stdlib.T_Struct([['name', ctc0], ['buyerAddress', ctc1], ['supplierAddress', ctc1]]);
  const ctc3 = stdlib.T_UInt;
  const ctc4 = stdlib.T_Contract;
  const ctc5 = stdlib.T_Array(ctc4, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '10'));
  
  const Explorer_deliveredNetworkTime = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [v252, v253, v274, v275] = svs;
      return (await ((async () => {
        
        
        return v253;}))(...args));
      }
    
    stdlib.assert(false, 'illegal view')
    };
  const Explorer_deployedNetworkTime = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [v252, v253, v274, v275] = svs;
      return (await ((async () => {
        
        
        return v253;}))(...args));
      }
    
    stdlib.assert(false, 'illegal view')
    };
  const Explorer_details = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [v252, v253, v274, v275] = svs;
      return (await ((async () => {
        
        
        return v252;}))(...args));
      }
    
    stdlib.assert(false, 'illegal view')
    };
  const Explorer_listOfIngredients = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [v252, v253, v274, v275] = svs;
      return (await ((async () => {
        
        
        return v275;}))(...args));
      }
    
    stdlib.assert(false, 'illegal view')
    };
  const Explorer_rejectReason = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [v252, v253, v274, v275] = svs;
      return (await ((async () => {
        
        const v259 = 'Too salty. I Reject                                                                                                             ';
        
        return v259;}))(...args));
      }
    
    stdlib.assert(false, 'illegal view')
    };
  const Explorer_reviewedNetworkTime = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [v252, v253, v274, v275] = svs;
      return (await ((async () => {
        
        
        return v253;}))(...args));
      }
    
    stdlib.assert(false, 'illegal view')
    };
  const Explorer_state = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [v252, v253, v274, v275] = svs;
      return (await ((async () => {
        
        
        return stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '0');}))(...args));
      }
    
    stdlib.assert(false, 'illegal view')
    };
  return {
    infos: {
      Explorer: {
        deliveredNetworkTime: {
          decode: Explorer_deliveredNetworkTime,
          dom: [],
          rng: ctc3
          },
        deployedNetworkTime: {
          decode: Explorer_deployedNetworkTime,
          dom: [],
          rng: ctc3
          },
        details: {
          decode: Explorer_details,
          dom: [],
          rng: ctc2
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
          rng: ctc3
          },
        state: {
          decode: Explorer_state,
          dom: [],
          rng: ctc3
          }
        }
      },
    views: {
      3: [ctc2, ctc3, ctc3, ctc5]
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
  const ctc2 = stdlib.T_Struct([['name', ctc0], ['buyerAddress', ctc1], ['supplierAddress', ctc1]]);
  const ctc3 = stdlib.T_Null;
  const ctc4 = stdlib.T_Contract;
  const ctc5 = stdlib.T_Tuple([ctc4]);
  
  
  const v245 = stdlib.protect(ctc2, interact.details, 'for Buyer\'s interact field details');
  
  const txn1 = await (ctc.sendrecv({
    args: [v245],
    evt_cnt: 1,
    funcNum: 0,
    lct: stdlib.checkedBigNumberify('./index.rsh:53:11:dot', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc2],
    pay: [stdlib.checkedBigNumberify('./index.rsh:53:11:decimal', stdlib.UInt_max, '0'), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v252], secs: v254, time: v253, didSend: v30, from: v251 } = txn1;
      
      ;
      
      const v263 = await ctc.getContractInfo();
      const v273 = [v263, v263, v263, v263, v263, v263, v263, v263, v263, v263];
      const v274 = stdlib.checkedBigNumberify('./index.rsh:77:51:decimal', stdlib.UInt_max, '0');
      const v275 = v273;
      const v276 = v253;
      
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
    tys: [ctc2],
    waitIfNotPresent: false
    }));
  const {data: [v252], secs: v254, time: v253, didSend: v30, from: v251 } = txn1;
  ;
  stdlib.protect(ctc3, await interact.launched(), {
    at: './index.rsh:54:28:application',
    fs: ['at ./index.rsh:54:28:application call to [unknown function] (defined at: ./index.rsh:54:28:function exp)', 'at ./index.rsh:54:28:application call to "liftedInteract" (defined at: ./index.rsh:54:28:application)'],
    msg: 'launched',
    who: 'Buyer'
    });
  
  const v263 = await ctc.getContractInfo();
  const v273 = [v263, v263, v263, v263, v263, v263, v263, v263, v263, v263];
  let v274 = stdlib.checkedBigNumberify('./index.rsh:77:51:decimal', stdlib.UInt_max, '0');
  let v275 = v273;
  let v276 = v253;
  
  let txn2 = txn1;
  while (await (async () => {
    
    return true;})()) {
    const txn3 = await (ctc.recv({
      didSend: false,
      evt_cnt: 1,
      funcNum: 2,
      out_tys: [ctc5],
      timeoutAt: undefined /* mto */,
      waitIfNotPresent: false
      }));
    const {data: [v326], secs: v328, time: v327, didSend: v188, from: v325 } = txn3;
    undefined /* setApiDetails */;
    const v330 = v326[stdlib.checkedBigNumberify('./index.rsh:83:14:spread', stdlib.UInt_max, '0')];
    const v331 = stdlib.lt(v274, stdlib.checkedBigNumberify('./index.rsh:84:28:decimal', stdlib.UInt_max, '10'));
    stdlib.assert(v331, {
      at: 'reach standard library:57:5:application',
      fs: ['at ./index.rsh:84:18:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:83:49:application call to [unknown function] (defined at: ./index.rsh:83:49:function exp)', 'at ./index.rsh:83:49:application call to [unknown function] (defined at: ./index.rsh:83:49:function exp)'],
      msg: 'Number of ingredients cannot exceed 10',
      who: 'Buyer'
      });
    ;
    const v337 = null;
    await txn3.getOutput('Seller_addIngredient', 'v337', ctc3, v337);
    const v345 = stdlib.Array_set(v275, v274, v330);
    const v346 = stdlib.safeAdd(v274, stdlib.checkedBigNumberify('./index.rsh:88:76:decimal', stdlib.UInt_max, '1'));
    const cv274 = v346;
    const cv275 = v345;
    const cv276 = v327;
    
    v274 = cv274;
    v275 = cv275;
    v276 = cv276;
    
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
  const ctc2 = stdlib.T_Struct([['name', ctc0], ['buyerAddress', ctc1], ['supplierAddress', ctc1]]);
  const ctc3 = stdlib.T_UInt;
  const ctc4 = stdlib.T_Contract;
  const ctc5 = stdlib.T_Array(ctc4, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '10'));
  const ctc6 = stdlib.T_Tuple([ctc4]);
  const ctc7 = stdlib.T_Null;
  
  
  const [v252, v253, v274, v275] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [ctc2, ctc3, ctc3, ctc5]);
  const v314 = stdlib.protect(ctc6, await interact.in(), {
    at: './index.rsh:1:23:application',
    fs: ['at ./index.rsh:83:49:application call to [unknown function] (defined at: ./index.rsh:83:49:function exp)', 'at ./index.rsh:83:49:application call to [unknown function] (defined at: ./index.rsh:83:49:function exp)'],
    msg: 'in',
    who: 'Seller_addIngredient'
    });
  const v317 = stdlib.lt(v274, stdlib.checkedBigNumberify('./index.rsh:84:28:decimal', stdlib.UInt_max, '10'));
  stdlib.assert(v317, {
    at: 'reach standard library:57:5:application',
    fs: ['at ./index.rsh:84:18:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:83:49:application call to [unknown function] (defined at: ./index.rsh:83:49:function exp)', 'at ./index.rsh:83:49:application call to [unknown function] (defined at: ./index.rsh:83:49:function exp)'],
    msg: 'Number of ingredients cannot exceed 10',
    who: 'Seller_addIngredient'
    });
  
  const txn1 = await (ctc.sendrecv({
    args: [v252, v253, v274, v275, v314],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc6],
    pay: [stdlib.checkedBigNumberify('./index.rsh:86:22:decimal', stdlib.UInt_max, '0'), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v326], secs: v328, time: v327, didSend: v188, from: v325 } = txn1;
      
      sim_r.txns.push({
        kind: 'api',
        who: "Seller_addIngredient"
        });
      const v330 = v326[stdlib.checkedBigNumberify('./index.rsh:83:14:spread', stdlib.UInt_max, '0')];
      ;
      const v337 = null;
      const v338 = await txn1.getOutput('Seller_addIngredient', 'v337', ctc7, v337);
      
      const v345 = stdlib.Array_set(v275, v274, v330);
      const v346 = stdlib.safeAdd(v274, stdlib.checkedBigNumberify('./index.rsh:88:76:decimal', stdlib.UInt_max, '1'));
      const v430 = v346;
      const v431 = v345;
      sim_r.isHalt = false;
      
      return sim_r;
      }),
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [ctc2, ctc3, ctc3, ctc5, ctc6],
    waitIfNotPresent: false
    }));
  const {data: [v326], secs: v328, time: v327, didSend: v188, from: v325 } = txn1;
  undefined /* setApiDetails */;
  const v330 = v326[stdlib.checkedBigNumberify('./index.rsh:83:14:spread', stdlib.UInt_max, '0')];
  const v331 = stdlib.lt(v274, stdlib.checkedBigNumberify('./index.rsh:84:28:decimal', stdlib.UInt_max, '10'));
  stdlib.assert(v331, {
    at: 'reach standard library:57:5:application',
    fs: ['at ./index.rsh:84:18:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:83:49:application call to [unknown function] (defined at: ./index.rsh:83:49:function exp)', 'at ./index.rsh:83:49:application call to [unknown function] (defined at: ./index.rsh:83:49:function exp)'],
    msg: 'Number of ingredients cannot exceed 10',
    who: 'Seller_addIngredient'
    });
  ;
  const v337 = null;
  const v338 = await txn1.getOutput('Seller_addIngredient', 'v337', ctc7, v337);
  if (v188) {
    stdlib.protect(ctc7, await interact.out(v326, v338), {
      at: './index.rsh:83:15:application',
      fs: ['at ./index.rsh:83:15:application call to [unknown function] (defined at: ./index.rsh:83:15:function exp)', 'at ./index.rsh:87:20:application call to "ret" (defined at: ./index.rsh:86:30:function exp)', 'at ./index.rsh:86:30:application call to [unknown function] (defined at: ./index.rsh:86:30:function exp)'],
      msg: 'out',
      who: 'Seller_addIngredient'
      });
    }
  else {
    }
  
  const v345 = stdlib.Array_set(v275, v274, v330);
  const v346 = stdlib.safeAdd(v274, stdlib.checkedBigNumberify('./index.rsh:88:76:decimal', stdlib.UInt_max, '1'));
  const v430 = v346;
  const v431 = v345;
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
    pure: [`Explorer_deliveredNetworkTime()uint64`, `Explorer_deployedNetworkTime()uint64`, `Explorer_details()(byte[128],address,address)`, `Explorer_listOfIngredients()uint64[10]`, `Explorer_rejectReason()byte[128]`, `Explorer_reviewedNetworkTime()uint64`, `Explorer_state()uint64`],
    sigs: [`Explorer_deliveredNetworkTime()uint64`, `Explorer_deployedNetworkTime()uint64`, `Explorer_details()(byte[128],address,address)`, `Explorer_listOfIngredients()uint64[10]`, `Explorer_rejectReason()byte[128]`, `Explorer_reviewedNetworkTime()uint64`, `Explorer_state()uint64`, `Seller_addIngredient(uint64)byte[0]`]
    },
  appApproval: `ByAMAAMBCP3psbgIxOaxjw2ZxPiSDf/b64gMlqf0sQWBvIzlB7eeyo0FAiYEAQABAQECACI1ADEYQQLlK2RJIls1ASVbNQI2GgAXSUEBciI1BCQ1BkkhBAxAAHlJIQUMQAA/SSEGDEAAHCEGEkQ0ASMSRChkKWRQKmRQSTUDV8AINQdCApMhBRJENAEjEkQoZClkUCpkUEk1A1fACDUHQgJ3SSEHDEAAHCEHEkQ0ASMSRChkKWRQKmRQSTUDVwDANQdCAlQhBBJENAEjEkQlrzUHQgJESSEIDEAAtEkhCQxAAJEhCRJENAEjEkSAgAFUb28gc2FsdHkuIEkgUmVqZWN0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADUHQgGlIQgSRDQBIxJEKGQpZFAqZFBJNQNX0FA1B0IBiUkhCgxAAAohChJENhoBQgA4geXe4q4DEkQ0ASMSRChkKWRQKmRQSTUDV8AINQdCAVg2GgIXNQQ2GgM2GgEXSSELDEAAaCELEkQjNAESRDQESSISTDQCEhFEKGQpZFAqZFBJNQOByAFbNf9JNQU1/oAEHIZP5TT+ULA0/4EKDESACAAAAAAAAAFRsCs1BzQDVwDANAOBwAFbNP8kCDQDV9BQNP8lCzT+XTIGQgBeIhJEgaCNBogA+CI0ARJENARJIhJMNAISEURJNQU1/4AEPMwh+DT/ULAxGDX+NP8yBiI0/hY0/hZQNP4WUDT+FlA0/hZQNP4WUDT+FlA0/hZQNP4WUDT+FlAyBkIAADX/Nf41/TX8STX7NPwWUDT9FlA0/lAoSwFXAH9nKUsBV39/ZypLAVf+ImdIIzUBMgY1AkIAHDEZgQUSRLEisgEisggkshAyCbIJMgqyB7NCAAUxGSISRCs0ARY0AhZQZzQGQQAKgAQVH3x1NAdQsDQASSQIMgQSRDEWEkQkQzEZIhJEQv/fIjE0EkSBBDE1EkQiMTYSRCIxNxJEIjUBIjUCQv+uNABJSiQINQA4BzIKEkQ4ECQSRDgIEkSJ`,
  appClear: `Bw==`,
  companionInfo: null,
  extraPages: 0,
  mapDataKeys: 0,
  mapDataSize: 0,
  stateKeys: 3,
  stateSize: 288,
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
                  }
                ],
                "internalType": "struct T2",
                "name": "v252",
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
                  }
                ],
                "internalType": "struct T2",
                "name": "v252",
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
                "name": "v326",
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
    "name": "_reach_oe_v337",
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
    "inputs": [],
    "name": "Explorer_state",
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
                "name": "v326",
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
  Bytecode: `0x608060405260405162001928380380620019288339810160408190526200002691620004c1565b600080554360035562000038620001fc565b7f58c2aa8abdc62e89f57fa6bc7a22dc6fe4002983647d3ee0c49db5f763e6dda533836040516200006b92919062000585565b60405180910390a1620000813415600e6200015b565b308082526020808301805192909252825182516001600160a01b039182169201919091528251825190821660409091015282518251908216606090910152825182519082166080909101528251825190821660a0909101528251825190821660c0909101528251825190821660e0909101528251825190821661010090910152825191519116610120909101526200011862000226565b6020808401515182515281514390820181905282820180516000905284830151815190930192909252905160400152620001528162000185565b505050620006d8565b81620001815760405163100960cb60e01b81526004810182905260240160405180910390fd5b5050565b6200018f6200024a565b81515181528151602090810151818301528083018051516040808501919091529051820151606084015260036000554360015551620001d191839101620005fd565b60405160208183030381529060405260029080519060200190620001f7929190620002ac565b505050565b604051806040016040528060006001600160a01b03168152602001620002216200033b565b905290565b60405180604001604052806200023b6200035a565b815260200162000221620003a7565b604080516101608101909152600060e082018181526101008301829052610120830182905261014083018290526080830190815260a0830182905260c0830191909152819081526020016000815260200160008152602001620002216200033b565b828054620002ba906200069b565b90600052602060002090601f016020900481019282620002de576000855562000329565b82601f10620002f957805160ff191683800117855562000329565b8280016001018555821562000329579182015b82811115620003295782518255916020019190600101906200030c565b5062000337929150620003c3565b5090565b604051806101400160405280600a906020820280368337509192915050565b6040805161012081018252600060a0820181815260c0830182905260e0830182905261010083018290529282019283526060820181905260808201529081905b8152602001600081525090565b6040518060600160405280600081526020016200039a6200033b565b5b80821115620003375760008155600101620003c4565b604080519081016001600160401b03811182821017156200040b57634e487b7160e01b600052604160045260246000fd5b60405290565b604051602081016001600160401b03811182821017156200040b57634e487b7160e01b600052604160045260246000fd5b604051606081016001600160401b03811182821017156200040b57634e487b7160e01b600052604160045260246000fd5b604051608081016001600160401b03811182821017156200040b57634e487b7160e01b600052604160045260246000fd5b80516001600160a01b0381168114620004bc57600080fd5b919050565b600081830360e0811215620004d557600080fd5b620004df620003da565b83518152601f198201915060c0821215620004f957600080fd5b6200050362000411565b6200050d62000442565b60808412156200051c57600080fd5b6200052662000473565b9350602086015184526040860151602085015260608601516040850152608086015160608501528381526200055e60a08701620004a4565b60208201526200057160c08701620004a4565b604082015281526020820152949350505050565b60006101008201905060018060a01b0384168252825160208301526020830151620005f56040840182518051805183526020808201518185015260408083015181860152606092830151928501929092528201516001600160a01b0390811660808501529101511660a090910152565b509392505050565b81518051805183526020808201518185015260408083015181860152606092830151928501929092528201516001600160a01b0390811660808501529101511660a0820152610240810160208084015160c0840152604084015160e08401526060840151610100840160005b600a811015620006915782516001600160a01b03168252918301919083019060010162000669565b5050505092915050565b600181811c90821680620006b057607f821691505b60208210811415620006d257634e487b7160e01b600052602260045260246000fd5b50919050565b61124080620006e86000396000f3fe6080604052600436106100a55760003560e01c80638e4ad75f116100615780638e4ad75f14610157578063ab53f2c614610179578063bd7ce4101461019c578063c016489f146101b1578063dae16031146101d4578063efb34933146101e957005b8063196c99be146100ae5780631e93b0f1146100d957806369afda47146100f857806373e758ed1461010b57806379a7e9b71461012d578063832307571461014257005b366100ac57005b005b3480156100ba57600080fd5b506100c36101fe565b6040516100d09190610d4e565b60405180910390f35b3480156100e557600080fd5b506003545b6040519081526020016100d0565b6100ac610106366004610d79565b610231565b34801561011757600080fd5b5061012061025c565b6040516100d09190610de1565b34801561013957600080fd5b506100ea61026f565b34801561014e57600080fd5b506001546100ea565b34801561016357600080fd5b5061016c61027b565b6040516100d09190610def565b34801561018557600080fd5b5061018e61028e565b6040516100d0929190610e2a565b3480156101a857600080fd5b506100ea61032b565b6101c46101bf366004610e9f565b610337565b60405190151581526020016100d0565b3480156101e057600080fd5b506100ea610348565b3480156101f557600080fd5b506100ea610354565b60408051608081018252600080825260208201819052918101829052606081018290529061022b81610360565b91505090565b60408051602081019091526000815261025861025236849003840184610f48565b826104ab565b5050565b610264610ba1565b600061022b81610695565b60008061022b8161075c565b610283610bdc565b600061022b81610820565b6000606060005460028080546102a390610fca565b80601f01602080910402602001604051908101604052809291908181526020018280546102cf90610fca565b801561031c5780601f106102f15761010080835404028352916020019161031c565b820191906000526020600020905b8154815290600101906020018083116102ff57829003601f168201915b50505050509050915091509091565b60008061022b816108ea565b600061034282610912565b92915050565b60008061022b81610946565b60008061022b8161096e565b604080516080810182526000808252602082018190529181018290526060810182905290546003141561049a5760006002805461039c90610fca565b80601f01602080910402602001604051908101604052809291908181526020018280546103c890610fca565b80156104155780601f106103ea57610100808354040283529160200191610415565b820191906000526020600020905b8154815290600101906020018083116103f857829003601f168201915b505050505080602001905181019061042d9190611081565b905061045d6040805160a08101825260006020820181815292820181905260608201819052608082015290815290565b805172151bdbc81cd85b1d1e4b88124814995a9958dd606a1b90528051600060209091018190528151604001819052815160600152519392505050565b6104a66000600b610a2d565b919050565b6104bb6003600054146011610a2d565b81516104d69015806104cf57508251600154145b6012610a2d565b6000808055600280546104e890610fca565b80601f016020809104026020016040519081016040528092919081815260200182805461051490610fca565b80156105615780601f1061053657610100808354040283529160200191610561565b820191906000526020600020905b81548152906001019060200180831161054457829003601f168201915b50505050508060200190518101906105799190611081565b60408051338152855160208083019190915286015151516001600160a01b03168183015290519192507f397fbf74ee760faaaf416e26711cae0f761d205a28047865f4cb3b3fdc062bbc919081900360600190a16105df600a826040015110600f610a2d565b6105eb34156010610a2d565b604051600081527f97e6c0b572406a8481e0ca15b9aa02f41d87fd377e12a6c0720f772fcd35d5db9060200160405180910390a16000825261062b610c00565b8151815152602080830151825190910152604082015161064c906001610a53565b60208083015191909152606083015160408401519186015151516106709290610aa0565b6020808301805190910191909152514360409091015261068f81610b30565b50505050565b61069d610ba1565b60036000541415610750576000600280546106b790610fca565b80601f01602080910402602001604051908101604052809291908181526020018280546106e390610fca565b80156107305780601f1061070557610100808354040283529160200191610730565b820191906000526020600020905b81548152906001019060200180831161071357829003601f168201915b50505050508060200190518101906107489190611081565b519392505050565b6104a660006009610a2d565b6000600360005414156108145760006002805461077890610fca565b80601f01602080910402602001604051908101604052809291908181526020018280546107a490610fca565b80156107f15780601f106107c6576101008083540402835291602001916107f1565b820191906000526020600020905b8154815290600101906020018083116107d457829003601f168201915b50505050508060200190518101906108099190611081565b602001519392505050565b6104a66000600c610a2d565b610828610bdc565b600360005414156108de5760006002805461084290610fca565b80601f016020809104026020016040519081016040528092919081815260200182805461086e90610fca565b80156108bb5780601f10610890576101008083540402835291602001916108bb565b820191906000526020600020905b81548152906001019060200180831161089e57829003601f168201915b50505050508060200190518101906108d39190611081565b606001519392505050565b6104a66000600a610a2d565b6000600360005414156109065760006002805461077890610fca565b6104a660006008610a2d565b600061091c610c20565b602080820151516001600160a01b03851690526040805191820190526000815261074882826104ab565b6000600360005414156109625760006002805461077890610fca565b6104a660006007610a2d565b600060036000541415610a255760006002805461098a90610fca565b80601f01602080910402602001604051908101604052809291908181526020018280546109b690610fca565b8015610a035780601f106109d857610100808354040283529160200191610a03565b820191906000526020600020905b8154815290600101906020018083116109e657829003601f168201915b5050505050806020019051810190610a1b9190611081565b5060009392505050565b6104a66000600d5b816102585760405163100960cb60e01b8152600481018290526024015b60405180910390fd5b600082610a60838261115b565b91508110156103425760405162461bcd60e51b815260206004820152600c60248201526b616464206f766572666c6f7760a01b6044820152606401610a4a565b610aa8610bdc565b60005b600a811015610b02578481600a8110610ac657610ac6611173565b60200201518282600a8110610add57610add611173565b6001600160a01b03909216602092909202015280610afa81611189565b915050610aab565b50818184600a8110610b1657610b16611173565b6001600160a01b0390921660209290920201529392505050565b610b38610c4d565b81515181528151602090810151818301528083018051516040808501919091529051820151606084015260036000554360015551610b78918391016111a4565b60405160208183030381529060405260029080519060200190610b9c929190610c7b565b505050565b6040805160e0810182526000606082018181526080830182905260a0830182905260c083018290528252602082018190529181019190915290565b604051806101400160405280600a906020820280368337509192915050565b905290565b6040518060400160405280610c13610cff565b8152602001610bfb610d1f565b604051806040016040528060008152602001610bfb60408051808201909152600060208201908152815290565b6040518060800160405280610c60610ba1565b81526020016000815260200160008152602001610bfb610bdc565b828054610c8790610fca565b90600052602060002090601f016020900481019282610ca95760008555610cef565b82601f10610cc257805160ff1916838001178555610cef565b82800160010185558215610cef579182015b82811115610cef578251825591602001919060010190610cd4565b50610cfb929150610d39565b5090565b6040518060400160405280610d12610ba1565b8152602001600081525090565b604051806060016040528060008152602001610d12610bdc565b5b80821115610cfb5760008155600101610d3a565b8151815260208083015190820152604080830151908201526060808301519082015260808101610342565b600060408284031215610d8b57600080fd5b50919050565b610dbd828251805182526020810151602083015260408101516040830152606081015160608301525050565b60208101516001600160a01b0390811660808401526040909101511660a090910152565b60c081016103428284610d91565b6101408101818360005b600a811015610e215781516001600160a01b0316835260209283019290910190600101610df9565b50505092915050565b82815260006020604081840152835180604085015260005b81811015610e5e57858101830151858201606001528201610e42565b81811115610e70576000606083870101525b50601f01601f191692909201606001949350505050565b6001600160a01b0381168114610e9c57600080fd5b50565b600060208284031215610eb157600080fd5b8135610ebc81610e87565b9392505050565b634e487b7160e01b600052604160045260246000fd5b6040516020810167ffffffffffffffff81118282101715610efc57610efc610ec3565b60405290565b6040516080810167ffffffffffffffff81118282101715610efc57610efc610ec3565b6040516060810167ffffffffffffffff81118282101715610efc57610efc610ec3565b60008183036040811215610f5b57600080fd5b6040516040810181811067ffffffffffffffff82111715610f7e57610f7e610ec3565b604052833581526020601f1983011215610f9757600080fd5b610f9f610ed9565b9150610fa9610ed9565b6020850135610fb781610e87565b8152825260208101919091529392505050565b600181811c90821680610fde57607f821691505b60208210811415610d8b57634e487b7160e01b600052602260045260246000fd5b80516104a681610e87565b600082601f83011261101b57600080fd5b60405161014080820182811067ffffffffffffffff8211171561104057611040610ec3565b6040528301818582111561105357600080fd5b845b8281101561107657805161106881610e87565b825260209182019101611055565b509195945050505050565b600081830361024081121561109557600080fd5b61109d610f02565b60c08212156110ab57600080fd5b6110b3610f25565b60808312156110c157600080fd5b6110c9610f02565b9250845183526020850151602084015260408501516040840152606085015160608401528281526110fc60808601610fff565b602082015261110d60a08601610fff565b60408201528082525060c0840151602082015260e0840151604082015261113885610100860161100a565b6060820152949350505050565b634e487b7160e01b600052601160045260246000fd5b6000821982111561116e5761116e611145565b500190565b634e487b7160e01b600052603260045260246000fd5b600060001982141561119d5761119d611145565b5060010190565b6000610240820190506111b8828451610d91565b60208084015160c0840152604084015160e08401526060840151610100840160005b600a8110156112005782516001600160a01b0316825291830191908301906001016111da565b505050509291505056fea2646970667358221220088e482c67a70cb5e0dadc9c9579c0e19af400b6df54473e8fcc48d7fe302d9f64736f6c634300080c0033`,
  BytecodeLen: 6440,
  Which: `oD`,
  version: 8,
  views: {
    Explorer: {
      deliveredNetworkTime: `Explorer_deliveredNetworkTime`,
      deployedNetworkTime: `Explorer_deployedNetworkTime`,
      details: `Explorer_details`,
      listOfIngredients: `Explorer_listOfIngredients`,
      rejectReason: `Explorer_rejectReason`,
      reviewedNetworkTime: `Explorer_reviewedNetworkTime`,
      state: `Explorer_state`
      }
    }
  };
export const _stateSourceMap = {
  2: {
    at: './index.rsh:92:13:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  3: {
    at: './index.rsh:77:23:after expr stmt semicolon',
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
