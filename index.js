var fs = require('fs')
var path = require('path')
var dotjson = require('dotjson')

var optimist = require('optimist')
  .usage(require('heredoc')(function(){/*
Usage: $0 [options]

  set module's registry to global default
      $0

  get module registry
      $0 -r, --registry

  set module registry
      $0 -r, --registry <registry url>

  get global registry
    $0-g, --global

  set global registry
    $0 -g, --global <registry url>
*/}))
  .alias('h','help')
    .boolean('h')
    .describe('h', 'show help')
  .alias('r','registry')
    .describe('r', 'gets or sets the current module\'s registry url')
  .alias('g','global')
    .describe('g', 'gets or sets the default registry used when protecting a module')
var argv = optimist.argv


if (argv.help) {
  optimist.showHelp()
  process.exit()
}

const REGISTRY_KEY = 'publishConfig.registry'
const LOCAL = path.resolve(process.cwd(), 'package.json')
const GLOBAL = path.resolve(__dirname, '.config')

if (argv.registry) {
  if (typeof argv.registry === 'string') {
    dotjson.set(LOCAL, argv.registry)
  } else {
    getRegistry(LOCAL)
  }
  process.exit()
}

if (argv.global) {
  if (typeof argv.global === 'string') {
    var setter = {}
    setter[REGISTRY_KEY] = argv.global
    return dotjson.set(GLOBAL, setter, {createFile: true})
  } else {
    getRegistry(GLOBAL)
  }
  process.exit()
}

// default
if (fs.existsSync(LOCAL)) {
  var global;
  try {
    global = dotjson.get(GLOBAL, REGISTRY_KEY)
    if (!global) throw new Error()
  } catch (e) {
    console.error('could not read global registry')
    process.exit(1)
  }

  var setter = {
    'license': 'proprietary'
  }
  setter[REGISTRY_KEY] = global

  dotjson.set(LOCAL, setter)
  console.log(fs.readFileSync(LOCAL, 'utf8'))
  console.log(LOCAL + ' protected!')
} else {
  console.log('package.json does not exist')
}


function getRegistry(path) {
  try {
    var val = dotjson.get(path, REGISTRY_KEY)
    if (!val) throw new Error()
    process.stderr.write('registry: ')
  } catch (e) {
    console.log('unable to get registry from ' + path)
  }
}