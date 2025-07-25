import app from './app'
import config from './config/config'
import logger from './util/logger';


const Server = app.listen(config.PORT)

;(() => {
    try {
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
