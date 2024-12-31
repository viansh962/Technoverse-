export const sendNotification = (io, userId, notification) => {
  io.to(userId).emit('notification', notification);
};