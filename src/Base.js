// 基类，提供一些通用方法
import FS from 'fs'
import PATH from 'path'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'
import jsonuri from 'jsonuri'

import { motoImport, logger, promisify, sleep, runBash } from './util'

export default class Base {
  get logger () {
    return logger
  }

  get env () {
    const self = this
    const ENV_PATH = PATH.resolve(self.config.path.userDir, 'env.json')
    return {
      ENV_PATH,

      async get (key) {
        let env = await self.import(ENV_PATH)
        if (!arguments.length) {
          return env
        }
        const ret = jsonuri.get(env, key)
        return ret == null ? null : ret
      },

      async set (key, value) {
        const env = await this.get()
        if (value == null) {
          jsonuri.rm(env, key)
        } else {
          jsonuri.set(env, key, value)
        }
        await self.write(ENV_PATH, JSON.stringify(env, null, 2))
      }
    }
  }

  /**
   * @description setTimeout 的封装
   * @return Promise
   */
  sleep () {
    return sleep
  }

  /**
   * @description 执行 shell 脚本
   * @return Promise
   */
  runBash (bash) {
    return runBash(bash)
  }

  /**
   * @description 转化为相对于项目的绝对路径
   */
  resolvePath (path, baseDir) {
    baseDir = baseDir || this.config.path.baseDir
    return PATH.resolve(baseDir, path)
  }

  /**
   * @description 异步引入一个模块
   * @return Promise
   */
  import (mod) {
    return motoImport(mod)
  }

  /**
   * @description 删除目录或文件
   * @return Promise
   */
  async rm (path) {
    return promisify(rimraf)(path)
  }

  /**
   * @description 创建文件夹
   * @return Promise
   */
  async mkdir (path) {
    return promisify(mkdirp)(path)
  }

  /**
   * @description 清空文件夹
   * @return Promise
   */
  async cleanDir (path) {
    await this.rm(path)
    await this.mkdir(path)
  }

  /**
   * @description 写入文件
   * @return Promise
   */
  async write (filePath, text = '', charset = 'utf8') {
    await this.mkdir(PATH.dirname(filePath))
    await promisify(FS.writeFile, FS)(filePath, String(text).trimRight() + '\n', charset)
  }

  async read (filePath, charset = 'utf8') {
    let ret
    try {
      ret = await promisify(FS.readFile, FS)(filePath, charset)
    } catch (e) {}
    return ret || null
  }
}

// ;(async function () {
//   const b = new Base()
//   console.log(await b.env.get())
// })()
