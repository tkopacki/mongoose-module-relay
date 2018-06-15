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
    items: [],
};

function init() {
    let enabledChannels = Cfg.get('relay.channels.enabled');
    let enabledChannelsArray = StringUtils.split(enabledChannels, ',');
    print('Enabled channels:', enabledChannelsArray.length);
    for (let idx = 0; idx < enabledChannelsArray.length; idx++) {
        print('Initializing channel', enabledChannelsArray[idx]);
        let item = {
            id: enabledChannelsArray[idx],
            name: Cfg.get('relay.channels.' + enabledChannelsArray[idx] + '.name'),
            pin: Cfg.get('relay.channels.' + enabledChannelsArray[idx] + '.pin'),
            type: 'switch',
            state: 0
        }
        module.items[item.id] = item;
        relay.off(item.pin);
    }
    print('All channels initialized');
}

function registerRPCs() {
    RPC.addHandler('Module.describe', function (args) {
        return module;
    });

    RPC.addHandler('Module.itemState', function (args) {
        let item = module.items[args.id];
        return {
            state: item.state
        };
    });

    RPC.addHandler('Module.turnOn', function (args) {
        let item = module.items[args.id];
        relay.on(item.pin);
        item.state = 1;
        return {
            result: '200'
        };
    });

    RPC.addHandler('Module.turnOff', function (args) {
        let item = module.items[args.id];
        relay.off(item.pin);
        item.state = 0;
        return {
            result: '200'
        };
    });
}

init();
registerRPCs();