/*
 * Copyright (c) 2015 Satinderjit Singh
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

 /*
 * Agama komodo-cli paths
 *
 */

var child_process = require('child_process'),
    path = require('path'),
    os = require('os'),
    setconf = require('./setconf');

if (os.platform() === 'darwin') {
  var komodocliBin = path.join(__dirname, '../assets/bin/osx/komodo-cli'),
      komodoDir = process.env.HOME + '/Library/Application Support/Komodo',
      zcashcliBin = '/Applications/ZCashSwingWalletUI.app/Contents/MacOS/zcash-cli',
      zcashDir = process.env.HOME + '/Library/Application Support/Zcash';
}

if (os.platform() === 'linux') {
  var komodocliBin = path.join(__dirname, '../assets/bin/linux64/komodo-cli'),
      komodoDir = process.env.HOME + '/.komodo';
}

if (os.platform() === 'win32') {
  var komodocliBin = path.join(__dirname, '../assets/bin/win64/komodo-cli.exe'),
      komodocliBin = path.normalize(komodocliBin),
      komodoDir = process.env.APPDATA + '/Komodo',
      komodoDir = path.normalize(komodoDir);
}

console.log(komodocliBin)

/**
 * The **komodo-cli** command is used to get komodo api calls answer.
 *
 * @private
 * @category coincli
 *
 */
var coincli = module.exports = {
  exec: child_process.exec,
  kmdcommand: kmdcommand,
  zeccommand: zeccommand
};

/**
 * Parses komodo-cli commands.
 *
 * @private
 * @static
 * @category coincli
 * @param {function} callback The callback function.
 *
 */
function parse_coincli_commands(callback) {
  return function(error, stdout, stderr) {
    if (error) callback(error, stderr);
    else callback(error, stdout);
    //console.log(stdout)
  };
}

function getConf(flock) {
  var komodoDir = '',
        ZcashDir = '',
        DaemonConfPath = '';

  console.log(flock);

  if (os.platform() === 'darwin') {
    komodoDir = process.env.HOME + '/Library/Application Support/Komodo';
    ZcashDir = process.env.HOME + '/Library/Application Support/Zcash';
  }

  if (os.platform() === 'linux') {
    komodoDir = process.env.HOME + '/.komodo';
    ZcashDir = process.env.HOME + '/.zcash';
  }

  if (os.platform() === 'win32') {
    komodoDir = process.env.APPDATA + '/Komodo';
    ZcashDir = process.env.APPDATA + '/Zcash';
  }

  switch (flock) {
    case 'komodod':
      DaemonConfPath = komodoDir + '/komodo.conf';
      if (os.platform() === 'win32') {
        DaemonConfPath = path.normalize(DaemonConfPath);
        console.log('===>>> SHEPHERD API OUTPUT ===>>>');
      }
      break;
    case 'zcashd':
      DaemonConfPath = ZcashDir + '/zcash.conf';
      if (os.platform() === 'win32') {
        DaemonConfPath = path.normalize(DaemonConfPath);
      }
      break;
    default:
      DaemonConfPath = komodoDir + '/' + flock + '/' + flock + '.conf';
      if (os.platform() === 'win32') {
        DaemonConfPath = path.normalize(DaemonConfPath);
      }
  }

  //console.log(DaemonConfPath);
  return DaemonConfPath;
}

/**
 * Parses komodo-cli commands.
 *
 * @private
 * @static
 * @category coincli
 * @param {function} callback The callback function.
 * @example
 *
 * var coincli = require('./coincli');
 *
 * coincli.kmdcommand('getinfo', function(err, command) {
 *   console.log(command);
 * });
 *
 * // =>
 * {
 *     "version" : 1000550,
 *     "protocolversion" : 170002,
 *     "notarized" : 254740,
 *     "notarizedhash" : "01f4f1c46662ccca2e7fa9e7e38d4d2e4ced4402fa0f4fc116b8f004bb8cf272",
 *     "notarizedtxid" : "2b16e47a176f8c1886ca0268243f9b96f8b2db466ea26ae99873d5224bbf80b6",
 *     "walletversion" : 60000,
 *     "balance" : 32632.46167742,
 *     "interest" : 0.00478671,
 *     "blocks" : 254791,
 *     "longestchain" : 254791,
 *     "timeoffset" : 0,
 *     "tiptime" : 1490815616,
 *     "connections" : 8,
 *     "proxy" : "",
 *     "difficulty" : 707836.56791394,
 *     "testnet" : false,
 *     "keypoololdest" : 1482746526,
 *     "keypoolsize" : 101,
 *     "paytxfee" : 0.00000000,
 *     "relayfee" : 0.00001000,
 *     "errors" : "WARNING: check your network connection, 157 blocks received in the last 4 hours (240 expected)",
 *     "notaryid" : -1,
 *     "pubkey" : "000000000000000000000000000000000000000000000000000000000000000000"
 * }
 * 
 */

 
function kmdcommand(flock, kmd_command, callback) {
  var ConfPath = getConf(flock);
  console.log(ConfPath);
  setconf.status(ConfPath, function(err, status) {
    console.log(JSON.stringify(status));
    if (callback) {
      return status;
    }
  });
  //console.log(JSON.stringify(this));
  /*if (callback) {
    return this.exec(komodocliBin + " " + kmd_command,
      parse_coincli_commands(callback));  
  }*/
}

function zeccommand(flock, zec_command, callback) {
  if (callback) {
    return this.exec(zcashcliBin + " " + zec_command,
      parse_coincli_commands(callback));  
  }
}
