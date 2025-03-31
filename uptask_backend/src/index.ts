import colors from 'colors'
import server from './server'


const port = process.env.PORT || 4000

// Start the server
server.listen(port, () => {
    console.log(colors.cyan.bold(`REST API funcionando en el puerto ${port}`))
})
