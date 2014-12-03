var async = require( 'async' )

/**
 * NTFS Constructor
 * NTFS version 1.1 and 1.2 are used by Windows NT4.
 * NTFS version 2.x is used by Windows 2000 Beta
 * NTFS version 3.0 is used by Windows 2000.
 * NTFS version 3.1 is used by Windows XP, 2003 and Vista.
 * @return {NTFS}
 */
function NTFS( options ) {
  
  if( !(this instanceof NTFS) )
    return new NTFS( options )
  
  this.volume = null
  this.vbr = new NTFS.VBR()
  this.mft = new NTFS.MFT()
  
}

// NTFS Buffer Size
NTFS.BUFFER_SIZE = 8192
// NTFS' logical block size
NTFS.BLOCK_SIZE = 512
// ???
NTFS.BLOCK_SIZE_BITS = 9

// Maximum allowed length for a file name
NTFS.MAX_NAME_LEN = 255

// NTFS logging levels
NTFS.LOGLEVEL = require( './enum/log-levels' )
// System defined attributes
NTFS.ATTR_TYPES = require( './enum/attr-types' )
// System file's MFT record numbers
NTFS.SYSTEM_FILE = require( './enum/system-files' )
// Magic identifiers of NTFS records
NTFS.RECORD_TYPE = require( './enum/record-types' )

// Volume Boot Record (512 bytes)
NTFS.VBR = require( './vbr' )
// NTFS Master File Table
NTFS.MFT = require( './mft' )

/**
 * Creates a new file system on the given volume
 * @param  {Object} volume
 * @param  {Object} options
 * @return {Object} ntfs
 */
NTFS.createFileSystem = function( options ) {
  return new NTFS( options )
}

/**
 * NTFS Prototype
 * @type {Object}
 */
NTFS.prototype = {
  
  /**
   * NTFS Constructor
   * @type {Function}
   */
  constructor: NTFS,
  
  mount: function( disk, partition, callback ) {
    
    var self = this
    var device = disk.device
    var blockSize = disk.device.blockSize
    
    async.waterfall([
      function readBootSector( next ) {
        device.readLBA( partition.firstLBA, partition.firstLBA + 1, null, next )
      },
      function parseBootSector( buffer, bytesRead, next ) {
        buffer.copy( self.bootSector )
        next()
      },
    ], function( error ) {
      callback.call( self, error )
    })
    
    return this
    
  },
  
  unmount: function( callback ) {
    // TODO
  },
  
}

// Exports
module.exports = NTFS
