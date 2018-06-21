load('api_net.js');
load('api_timer.js');

print(Net.STATUS_DISCONNECTED);
print(Net.STATUS_CONNECTING);
print(Net.STATUS_CONNECTED );
print(Net.STATUS_GOT_IP );

function startServer() {
    Net.serve({
        addr: 'udp://11345',
        onevent: function (connection, data, ev, edata) {
            print(data);
            print(ev);
            print(edata);
            Timer.set(5000, true, function () {
                Net.send(connection, 'hello !');
                print('Hello sent.');
            }, null);
        },
        ondata: function (connection, data) {
            print(data);
            print(connection);
        }
    });
}