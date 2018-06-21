load('api_net.js');
load('api_timer.js');
load('api_events.js')

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