import io from 'socket.io-client'
const socket = io('https://bananometro-api.herokuapp.com/')

export default socket;