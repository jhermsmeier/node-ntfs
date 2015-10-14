var NTFS = require( '../ntfs' )
var async = require( 'async' )

/**
 * NTFS Volume Constructor
 * NTFS version 1.1 and 1.2 are used by Windows NT4.
 * NTFS version 2.x is used by Windows 2000 Beta
 * NTFS version 3.0 is used by Windows 2000.
 * NTFS version 3.1 is used by Windows XP, 2003 and Vista.
 * @return {Volume}
 */
function Volume( options ) {
  
  if( !(this instanceof Volume) )
    return new Volume( options )
  
  this.device = null
  this.partition = null
  
  this.vbr = new Volume.BootRecord()
  this.mft = new NTFS.MFT( this )
  
}

/**
 * Volume Boot Record (VBR)
 * @type {Function}
 */
Volume.BootRecord = require( './boot-record' )

/**
 * Create a new NTFS Volume
 * @param  {Object} options
 * @return {Volume}
 */
Volume.create = function( options ) {
  return new Volume( options )
}

/**
 * NTFS Volume Prototype
 * @type {Object}
 */
Volume.prototype = {
  
  /**
   * NTFS Volume Constructor
   * @type {Function}
   */
  constructor: Volume,
  
  mount: function( disk, partition, callback ) {
    
    var self = this
    var device = disk.device
    var blockSize = disk.device.blockSize
    
    self.device = disk.device
    self.partition = partition
    
    async.waterfall([
      function readBootSector( next ) {
        device.readLBA(
          partition.firstLBA, partition.firstLBA + 1,
          null, next
        )
      },
      function parseBootSector( buffer, bytesRead, next ) {
        self.vbr.parse( buffer )
        next()
      },
      function loadMFT( next ) {
        self.mft.read( next )
      }
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
module.exports = Volume
