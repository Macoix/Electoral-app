import server from './config/express'
import signale from 'signale'
import { connect, MODE_TEST } from './config/database'

const port = process.env.port || 3000

connect(MODE_TEST, () => {
  server.listen(port, () => {
    signale.info(`Server is running on http://localhost:${port}`)
  })
})
