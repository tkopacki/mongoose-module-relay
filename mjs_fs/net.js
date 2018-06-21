load('api_net.js');
load('api_timer.js');
load('api_events.js')

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

Event.addGroupHandler(Net.EVENT_GRP, function(ev, ed, ud){
    print(ev);
    print(ed);
    print(ud);
}, {foo: 'bar'});

let connection = Net.connect({
    addr: 'udp://192.168.0.255:11345'
});
/* 
Timer.set(5000, true, function () {
    Net.send(connection, 'hello !');
}, null); */