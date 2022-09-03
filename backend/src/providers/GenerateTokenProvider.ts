import { sign } from 'jsonwebtoken'

import authConfig from '../config/auth'

export default {
  async generateToken(params: {}) {
    return sign(params, String(authConfig.secret), {
      expiresIn: '20s'
    })
  }
}
