'use strict'
// 
// Script to connect to the Nova SDS011, read PM values from the serial port 
// and write them to the console.
//
let serialport = require("serialport")
let sds011 = require('./lib/sds011')

let serial = new serialport.SerialPort("/dev/ttyUSB0", {
    baudrate: 9600
})
serial.on('open', function () {
    console.log('Connected')
})

serial.on('error', function (err) {
    console.error('Failed to connect:', err)
    process.exit(-1)
})

serial.on('data', function (data) {
    let pmValues = sds011(data)
    if (!pmValues) {
        log.error('failed to parse buffer [' + data.toString('hex') + ']')
        return
    }
    console.info("pm2.5: " + pmValues.pm2_5 + "\tpm10: " + pmValues.pm10)
});