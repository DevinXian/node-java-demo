const java = require('java')
const fs = require('fs')
const dir = './target/dependency'

const deps = fs.readdirSync(dir)
deps.forEach(dep => java.classpath.push(`${dir}/${dep}`))

java.classpath.push('src')

const serializer = java.newInstanceSync('com.Serializer')
const user = java.newInstanceSync('com.User', 'tmax');
console.log(user.getNameSync())

const result = serializer.serializeSync(user)
console.log(result)

const bytes = java.newArray('byte', Array.from(result))

const user2 = serializer.deserializeSync(bytes);
console.log(user2.getNameSync())

process.exit(0)


/**
 * 编译后运行 
 * javac -classpath target/dependency/fst-2.56.jar:target/dependency/commons-io-2.8.0.jar src/com/*.java
 * node index.js
 */