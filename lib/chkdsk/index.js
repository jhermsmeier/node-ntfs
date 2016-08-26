var NTFS = require( '../ntfs' )
var Emitter = require( 'events' ).EventEmitter
var inherit = require( 'bloodline' )

/**
 * @constructor
 * @param {NTFS.Volume} volume
 * @return {CheckDisk}
 */
function CheckDisk( volume, options ) {
  
  if( !(this instanceof CheckDisk) ) {
    return new CheckDisk( volume, options )
  }
  
  options = Object.assign( {}, CheckDisk.defaults, options )
  
  Emitter.call( this, options )
  
  /** @type {Object} */
  this.options = options
  /** @type {NTFS.Volume} */
  this.volume = volume
  
}

/**
 * Default optioins
 * @type {Object}
 */
CheckDisk.defaults = {}

/**
 * CheckDisk prototype
 * @type {Object}
 */
CheckDisk.prototype = {
  
  constructor: CheckDisk,
  
  start: function() {
    this.emit( 'error', new Error( 'Not implemented' ) )
  },
  
}

inherit( CheckDisk, Emitter )
// Exports
module.exports = CheckDisk
