load('api_net.js');
load('api_timer.js');

function startServer() {
    Net.serve({
        addr: 'udp://11345',
        onconnect: function (conn) {
            print(conn);
        },
        ondata: function (conn, data) {
            print(data);
            print(conn);
        }
    });
}

Timer.set(5000, true, function () {
    let connection = Net.connect('255.255.255.255:11345');
    Net.send(connection, 'hello !');
}, null);