import app from './app'
import config from './config/config'
import { initRateLimiter } from './config/rateLimiter'
import databaseService from './service/databaseService'
import logger from './util/logger'

const Server = app.listen(config.PORT)

// eslint-disable-next-line @typescript-eslint/no-floating-promises
;(async () => {
    try {
        //database connection
        const connection = await databaseService.connect()
        logger.info(`DATABASE_CONNECTION`, {
            meta: {
                CONNECTION_NAME: connection.name
            }
        })

        initRateLimiter(connection)

        logger.info(`RATE_LIMITER_INITIATED`, {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        })

        logger.info(`APPLICATION_STARTED`, {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        })
    } catch (err) {
        logger.error(`APPLICATION_ERROR`, { meta: err })

        Server.close((err) => {
            if (err) {
                logger.error(`APPLICATION_ERROR`, { meta: err })
            }
            process.exit(1)
        })
    }
})()
