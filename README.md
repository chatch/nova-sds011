# nova-sds011
[![](https://img.shields.io/npm/v/nova-sds011.svg)](https://www.npmjs.com/package/nova-sds011)
[![Build Status](https://travis-ci.org/chatch/nova-sds011.svg?branch=master)](https://travis-ci.org/chatch/nova-sds011)

[Nova SDS011](http://inovafitness.com/upload/file/20150311/14261262164716.pdf) PM sensor serial reader

## Quickstart

Plugin the Nova and run "node index.js". (NOTE: script assumes the Nova is at /dev/ttyUSB0)

## Library Usage

Use [serialport](https://www.npmjs.com/package/serialport) with this library to read values:

```
let serialport = require("serialport")
let sds011 = require('nova-sds011')
let serial = new serialport.SerialPort("/dev/ttyUSB0", {
    baudrate: 9600
})
serial.on('data', function (data) {
    let pmValues = sds011(data)
    if (!pmValues) {
        log.error('failed to parse buffer [' + data.toString('hex') + ']')
        return
    }
    console.info("pm2.5: " + pmValues.pm2_5 + "\tpm10: " + pmValues.pm10)
});
```
