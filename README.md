# Example NodeJS application that runs as a systemd service

This example shows how to fully integrate an express application into a Linux system using systemd.

## Prerequisities

The package depends on nodejs version 15 or later. To install it follow the instructions on NodeSource:
https://github.com/nodesource/distributions/blob/master/README.md#debinstall

## Info on the Ubuntu-provided nodejs package

The nodejs package provided by Ubuntu is split into two: nodejs and npm. To be able to use it you'll need
to modify the "node_dep.dependencies" list to include npm like so:

```
"node_dep": {
  "dependencies": "npm, libsystemd-dev"
}
```

Another reason not to use that package is that the node version provided by Ubuntu repositories is years behind what's currently available.

This results in warnings when building native bindings for the sd-notify package.

```
make: Entering directory '/opt/nodejs-systemd-example/app/node_modules/sd-notify/build'
  CXX(target) Release/obj.target/notify/notify.o
In file included from ../notify.cc:4:
/usr/include/nodejs/src/node.h:573:43: warning: cast between incompatible function types from ‘void (*)(v8::Local<v8::Object>)’ to ‘node::addon_register_func’ {aka ‘void (*)(
v8::Local<v8::Object>, v8::Local<v8::Value>, void*)’} [-Wcast-function-type]
  573 |       (node::addon_register_func) (regfunc),                          \
      |                                           ^
/usr/include/nodejs/src/node.h:607:3: note: in expansion of macro ‘NODE_MODULE_X’
  607 |   NODE_MODULE_X(modname, regfunc, NULL, 0)  // NOLINT (readability/null_usage)
      |   ^~~~~~~~~~~~~
../notify.cc:72:1: note: in expansion of macro ‘NODE_MODULE’
   72 | NODE_MODULE(addon, Init)
      | ^~~~~~~~~~~
  SOLINK_MODULE(target) Release/obj.target/notify.node
  COPY Release/notify.node
make: Leaving directory '/opt/nodejs-systemd-example/app/node_modules/sd-notify/build'
```

The systemd notification will still work but the install process isn't pretty. Use at own risk.
