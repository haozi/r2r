// 不允许用户修改的配置
import PATH from 'path'
import { getLanIp } from '../util/getIp'

export default {
  path: {
    userDir: PATH.resolve(process.env.HOME || process.env.USERPROFILE || process.env.HOMEPATH, '.moto')
  },
  lanIp: getLanIp()
}
