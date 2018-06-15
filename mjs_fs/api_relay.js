load('api_config.js');
load('api_string.js');
load('api_gpio.js');
load('api_rpc.js');

let relay = {
    init: function (pin) {
        GPIO.set_mode(pin, GPIO.MODE_OUTPUT);
    },
    on: function (pin) {
        GPIO.write(pin, Cfg.get('relay.config.stateOn'));
        print('Channel', name, 'switched to ON');
    },
    off: function (pin) {
        GPIO.write(pin, Cfg.get('relay.config.stateOff'));
        print('Channel', name, 'switched to OFF');
    }
};

let module = {
    id: Cfg.get('module.id'),
    name: Cfg.get('module.name'),
    items: []
};

function init() {
    let enabledChannels = Cfg.get('relay.channels.enabled');
    let enabledChannelsArray = StringUtils.split(enabledChannels, ',');
    print('Enabled channels:', enabledChannelsArray.length);
    for (let idx = 0; idx < enabledChannelsArray.length; idx++) {
        print('Initializing channel', enabledChannelsArray[idx]);
        module.items[enabledChannelsArray[idx]].id = enabledChannelsArray[idx];
        let name = 'relay.channels.' + module.items[enabledChannelsArray[idx]].id + '.name';
        print(name);
        module.items[enabledChannelsArray[idx]].name = Cfg.get('relay.channels.' + enabledChannelsArray[idx] + '.name');
        module.items[enabledChannelsArray[idx]].pin = Cfg.get('relay.channels.' + enabledChannelsArray[idx] + '.pin');
        module.items[enabledChannelsArray[idx]].type = 'switch';
        module.items[enabledChannelsArray[idx]].state = 0;
        relay.off(module.items[enabledChannelsArray[idx]].pin);
    }
    print('All channels initialized');
}

function registerRPCs() {
    RPC.addHandler('Module.describe', function (args) {
        return module;
    });

    RPC.addHandler('Module.itemState', function (args) {
        return {
            state: module.items[args.id].state
        };
    });

    RPC.addHandler('Module.turnOn', function (args) {
        relay.on(module.items[args.id].pin);
        module.items[args.id].state = 1;
        return {
            result: '200'
        };
    });

    RPC.addHandler('Module.turnOff', function (args) {
        relay.off(module.items[args.id].pin);
        module.items[args.id].state = 0;
        return {
            result: '200'
        };
    });
}

init();
registerRPCs();