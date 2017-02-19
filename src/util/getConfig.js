// 1.从 package.json 中的 moto 字段找
// 2.从项目根目录 .moto.config.js 找
// 3.从.config/moto.config.js 找
// 只认最后找到的一个

import PATH from 'path'
import merge from 'lodash.merge'
import { motoRequire } from './index'
import defaultConfig from '../config/config'
import resetConfig from '../config/config.rest'

const projectRoot = process.cwd()

export default function () {
  const pathes = [
    `${projectRoot}/package.json`,
    `${projectRoot}/moto.config.js`,
    `${projectRoot}/.config/moto.config.js`
  ]

  let userConfig

  // package.json
  const pkg = motoRequire(pathes.shift()) || {}
  userConfig = pkg.moto

  // other path
  pathes.forEach(path => {
    userConfig = motoRequire(path)
  })

  const ret = merge({}, defaultConfig, userConfig, resetConfig)
  ret.path.baseDir = PATH.resolve(ret.path.baseDir)
  ret.package = pkg

  return ret
}
