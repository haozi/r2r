import PATH from 'path'
import FS from 'fs'
import childProcess from 'child_process'
import { getLanIp } from './getIp'
import logger from 'node-lancer/logger'
import color from 'node-lancer/color'

export function runBash (bash, options = {}) {
  return new Promise((resolve, reject) => {
    const p = childProcess.exec(bash, options, (error) => {
      if (error) {
        reject(error)
        return
      }
      resolve()
    })
    p.stderr.pipe(process.stderr)
    p.stdout.pipe(process.stdout)
  })
}

export function sleep (delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

/**
 * 把 callback 变成 Promise 要求 callback 的第一个形参为 error
 */
export function promisify (fn, receiver) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn.apply(receiver, [...args, (err, res) => {
        return err ? reject(err) : resolve(res)
      }])
    })
  }
}

export function motoRequire (path) {
  try {
    const obj = require(path)
    return obj && obj.__esModule && obj.default ? obj.default : obj
  } catch (e) {
    return null
  }
}

/**
 * 遵从 规范，使用promise 的 import
 */
export function motoImport (path) {
  return new Promise((resolve, reject) => {
    const mod = motoRequire(path)
    if (!mod) {
      reject()
      return
    }
    resolve(mod)
  })
}

const motoPath = PATH.resolve(__dirname, '../..')
const baseDir = getConfig().path.baseDir
export function getModuleRealPath (path) {
  // 1. 从 项目的 node_modules/moto/node_modules 中找
  // 2. 从 项目的 node_modules/ 根目录找
  // 3. 从 moto 自己的 node_modules 中找

  let ret
  const paths = [
    `${baseDir}/node_modules/moto/node_modules/${path}`,
    `${baseDir}/node_modules/${path}`,
    `${motoPath}/node_modules/${path}`
  ]

  for (let path of paths) {
    if (FS.existsSync(path)) {
      ret = PATH.resolve(path)
      return ret
    }
  }
  return null
}

export { logger, color, getLanIp }
