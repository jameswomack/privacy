# npm-protect
CLI utility to modify a package.json to use a private npm registry

helpful for publishing lots of private packages

## usage

in a module's directory:

set module's registry to global default
    $ npm-protect

get module registry
    $ npm-protect -r, --registry

set module registry
    $ npm-protect -r, --registry <registry url>

get global registry
  $ npm-protect -g, --global

set global registry
  $ npm-protect -g, --global <registry url>


## behavior

when run without options, changes the current module's package.json by setting

    "license": "proprietary",
    "publishConfig": {
      "registry": "<global registry>"
    }

## license
MIT
(c) 2012 jden - Jason Denizac <jason@denizac.org>
http://jden.mit-license.org/2012