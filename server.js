const WebSocket = require('ws');

// Crear un servidor WebSocket
const wss = new WebSocket.Server({ port: 8080 });

// Gestionar conexiones de los clientes
wss.on('connection', (ws) => {
    console.log('Nuevo cliente conectado.');

    // Recibir mensajes de un cliente
    ws.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`);
        // Enviar el mensaje a todos los demás clientes conectados
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Detectar cuando un cliente se desconecta
    ws.on('close', () => {
        console.log('Cliente desconectado.');
    });
});

console.log('Servidor WebSocket escuchando en el puerto 8080.');