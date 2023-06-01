const java = require('java')
const { Redis } = require('ioredis')
const fs = require('fs')
const { redisConfig, sessionKey } = require('./config')

const dir = './target/dependency'

java.classpath.push('src')
fs.readdirSync(dir).forEach(dep => java.classpath.push(`${dir}/${dep}`))

const redisInst = new Redis(redisConfig)
const serializer = java.newInstanceSync('com.Serializer')

redisInst.get(sessionKey).then((value) => {
  value = Buffer.from(value, 'binary')
  console.log(value)

  const readBytes = java.newArray('byte', Array.from(value))
  const shiroUser = serializer.deserializeSync(readBytes);

  for (let i in shiroUser) {
    if (typeof i === 'function') {
      console.log(shiroUser[i]())
    } else
      console.log(i)
  }
  process.exit(0)

})



/**
 * 编译后运行 
 * javac -classpath target/dependency/fst-2.56.jar:target/dependency/commons-io-2.8.0.jar src/com/*.java
 * node index.js
 */