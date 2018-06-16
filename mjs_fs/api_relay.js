load('api_config.js');
load('api_string.js');
load('api_gpio.js');
load('api_rpc.js');

let module = {
    metadata: {
        id: Cfg.get('module.id'),
        name: Cfg.get('module.name')
    },
    items: [],
    keys: [],
    add: function (item) {
        this.items[item.id] = item;
        this.keys.push(item.id);
        GPIO.set_mode(item.pin, GPIO.MODE_OUTPUT);
        this.off(item.id);
    },
    on: function (id) {
        GPIO.write(this.items[id].pin, Cfg.get('relay.config.stateOn'));
        this.items[id].state = 1;
        print('Channel', this.items[id].name, 'switched to ON');
    },
    off: function (id) {
        GPIO.write(this.items[id].pin, Cfg.get('relay.config.stateOff'));
        this.items[id].state = 0;
        print('Channel', this.items[id].name, 'switched to OFF');
    },
    describe: function () {
        let description = {
            module_id: this.metadata.id,
            module_name: this.metadata.name,
            items: []
        };
        for (let i = 0; i < this.keys.length; i++) {
            description.items.push(this.items[this.keys[i]]);
        }
        return description;
    }
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
        };
        module.add(item);
    }
    print('All channels initialized');
}

function registerRPCs() {
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
        relay.on(args.id);
        return {
            result: '200'
        };
    });

    RPC.addHandler('Module.turnOff', function (args) {
        relay.off(args.id);
        return {
            result: '200'
        };
    });
}

init();
registerRPCs();