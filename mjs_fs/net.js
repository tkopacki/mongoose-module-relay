load('api_net.js');
load('api_timer.js');

print(Net.STATUS_DISCONNECTED);
print(Net.STATUS_CONNECTING);
print(Net.STATUS_CONNECTED);
print(Net.STATUS_GOT_IP);

let connection = Net.connect({
    addr: 'udp://192.168.0.255:11345'
});

function startServer() {

    Timer.set(5000, Timer.REPEAT, function () {
        Net.send(connection, "aaa");
        print('sent');
    }, null);

    Event.addGroupHandler(Event.SYS, function (ev, evdata, ud) {
        if (ev === Net.STATUS_GOT_IP) {
            RPC.call(RPC.LOCAL, 'Sys.GetInfo', null, function (resp, ud) {
                print('info:', JSON.stringify(resp));
                let ip = resp.wifi.sta_ip;
                let broadcast = 'udp://' + ip[0.10] + '255' + ':11345'
                print(ip);
                print(broadcast);
                Net.serve({
                    addr: broadcast,
                    onconnect: function (conn) {
                        print('connect');
                    },
                    ondata: function (conn, data) {
                        print('data');
                    },
                    onevent: function (conn, data, ev, edata) {
                        print('event');
                    },
                    onclose: function (conn) {
                        print('close');
                    },
                    onerror: function (conn) {
                        print('error');
                    }
                });
            }, null);
        }
    }, null);

}