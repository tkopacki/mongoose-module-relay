load('api_net.js');
load('api_timer.js');

print(Net.STATUS_DISCONNECTED);
print(Net.STATUS_CONNECTING);
print(Net.STATUS_CONNECTED);
print(Net.STATUS_GOT_IP);

let bag = {};

function startServer() {
    /*     Net.serve({
            addr: 'udp://192.168.0.255:11345',
            onconnect: function (conn) {
                print(conn, 'connect');
            },
            ondata: function (conn, data) {
                print(conn, data);
            },
            onevent: function (conn, data, ev, edata) {
                print('event');
            },
            onclose: function (conn) {
                print(conn, 'close');
            },
            onerror: function (conn) {
                print('error');
            }
        }); */

    Timer.set(5000, Timer.REPEAT, function () {
        let c = Net.connect({
            addr: 'udp://192.168.0.255:11345'
        });
        Net.send(c, "eee");
        print(c, 'sent');
        Net.close(c);
    }, null);
}