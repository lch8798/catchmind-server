const http = require('http');

const server = http.createServer();
const io = require('socket.io')(server);

let paint = [];

io.on('connection', (socket) => {

	// 방문자 랜더링
	socket.on('drawInit', () => {
		socket.emit('drawInit', paint);
	});

	// 실시간 랜더링
	socket.on('draw', (data) => {
		paint.push(data);
		io.emit('draw', data);
	});

	// 캔버스 초기화
	socket.on('paintInit', (data) => { 
		paint = []; 
		io.emit('paintInit', paint);
	});
});

const port = 8080;
server.listen(port, () => {
	    console.log('server listening on port ' + port);
});
