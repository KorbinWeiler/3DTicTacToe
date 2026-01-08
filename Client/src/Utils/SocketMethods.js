function AccecptInvitation(socket, opponentID, hostID, date) {
  socket.emit('accept invitation', opponentID, hostID, date);
}

function getInvites(socket, username, callback) {
  socket.emit('get invites', username, (response) => {
    callback(response);
  });
}

export { AccecptInvitation, getInvites };