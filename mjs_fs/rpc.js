load('api_rpc.js');

function registerRPCs(module) {
    RPC.addHandler('Module.describe', function (args) {
        print(module.describe());
        return module.describe();
    });

    RPC.addHandler('Module.itemState', function (args) {
        return {
            state: module.items[args.id].state
        };
    });

    RPC.addHandler('Module.turnOn', function (args) {
        module.on(args.id);
        return {
            result: '200'
        };
    });

    RPC.addHandler('Module.turnOff', function (args) {
        module.off(args.id);
        return {
            result: '200'
        };
    });
}

