import env from 'env-var'

import 'dotenv/config'

export const envs = {
    NODE_ENV:env.get('NODE_ENV').required().asString(),
    PORT: env.get('PORT').required().asPortNumber(),
    DB_URI:env.get('DB_URI').required().asString(),
    SECRET_JWT_SEED: env.get('SECRET_JWT_SEED').required().asString(),
    JWT_EXPIRE_IN: env.get('JWT_EXPIRE_IN').required().asString(),
    APY_KEY_WEATHERMAP: env.get('APY_KEY_WEATHERMAP').required().asString()
}




