load('api_net.js');

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