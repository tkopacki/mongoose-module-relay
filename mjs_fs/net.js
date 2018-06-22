load('api_net.js');
load('api_timer.js');

print(Net.STATUS_DISCONNECTED);
print(Net.STATUS_CONNECTING);
print(Net.STATUS_CONNECTED);
print(Net.STATUS_GOT_IP);

let connectionPlaceHolder = {};

function startServer() {
    /*     Net.serve({
            addr: 'udp://11345',
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
        }); */
    let connection = Net.connect({
        addr: 'udp://192.168.0.255:11345'
    });
    Timer.set(5000, Timer.REPEAT, function () {
        Net.send(connection, "aaa");
        print('sent');
    }, null);

}