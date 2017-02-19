import os from 'os'
const ifaces = os.networkInterfaces()
const ipV4table = {}
for (let dev in ifaces) {
  ifaces[dev].forEach((details, alias) => {
    if (details.family === 'IPv4') {
      ipV4table[dev + (alias ? ':' + alias : '')] = details
    }
  })
}

export function getLanIp () {
  for (let key in ipV4table) {
    let iface = ipV4table[key]
    if (iface.internal === false) {
      return iface.address
    }
  }
}
