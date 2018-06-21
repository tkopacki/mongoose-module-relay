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

let connection = Net.connect({
    addr: 'udp://255.255.255.255:11345',
    onconnect: function (c) {
        let connection = c;
        Timer.set(5000, true, function () {
            Net.send(connection, 'hello !');
        }, null);
    }
});