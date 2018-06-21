load('api_net.js');
load('api_timer.js');
load('api_events.js')

print(Net.STATUS_DISCONNECTED);
print(Net.STATUS_CONNECTING);
print(Net.STATUS_CONNECTED );
print(Net.STATUS_GOT_IP );

Event.addGroupHandler(Net.EVENT_GRP, function(event, wtf, data) {
    print(event);
    print(data);
}, {});

function startServer() {
    Net.serve({
        addr: 'udp://11345',
        onconnect: function (connection) {
            print('Connection to broadcast established');
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