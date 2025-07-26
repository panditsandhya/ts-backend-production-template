import { Connection } from 'mongoose'
import { RateLimiterMongo } from 'rate-limiter-flexible'

export let rateLimiterMongo: null | RateLimiterMongo = null

const DURATION = 60
const POINTS = 10

export const initRateLimiter = (mongooseconnection: Connection) => {
  rateLimiterMongo = new RateLimiterMongo({
    storeClient: mongooseconnection,
    points: POINTS,
    duration: DURATION
  })
}