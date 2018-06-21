load('net.js');
load('module.js');
load('rpc.js');

let module = initModule();
registerRPCs(module);
startServer();