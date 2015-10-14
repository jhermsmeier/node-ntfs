var crypto = require( 'crypto' )
var inherit = require( 'bloodline' )

/**
 * GUID Constructor
 * Microsoft's implementation of the
 * Distributed Computing Environment's (DCE)
 * Universally Unique Identifier (UUID)
 * @param {Buffer|String} value
 * @return {GUID}
 */
function GUID( value ) {
  
  if( !(this instanceof GUID) )
    return new GUID( value )
  
  // 128 bit GUID (UUID)
  Buffer.call( this, 16 )
  this.fill( 0 )
  
  if( Buffer.isBuffer( value ) )
    value.copy( this )
  
  if( typeof value === 'string' ) {
    value = value.replace( /[^a-z0-9]/gi, '' )
    this.write( value, 0, 16, 'hex' )
  }
  
}

/**
 * Create a new GUID
 * @param  {Buffer|String} value
 * @return {GUID}
 */
GUID.create = function( value ) {
  return new GUID( value )
}

GUID.generate = function() {
  // TODO: See spec (?)
}

/**
 * Create a new randomly generated GUID
 * @return {GUID}
 */
GUID.random = function() {
  var guid = new GUID(
    crypto.randomBytes( 16 )
  )
}

/**
 * GUID Prototype
 * @type {Object}
 */
GUID.prototype = {
  
  constructor: GUID,
  
  format: function() {
    return ( '' +
      ( '00000000' + this.readUInt32BE( 0 ).toString( 16 ) ).substr( -8 ) + '-' +
      ( '00000000' + this.readUInt16BE( 4 ).toString( 16 ) ).substr( -4 ) + '-' +
      ( '00000000' + this.readUInt16BE( 6 ).toString( 16 ) ).substr( -4 ) + '-' +
      ( '00000000' + this.readUInt16LE( 8 ).toString( 16 ) ).substr( -4 ) + '-' +
      this.toString( 'hex', 10 )
    ).toUpperCase()
  },
  
  inspect: function() {
    return '{' + this.format() + '}'
  },
  
}

// Inherit from Buffer
inherit( GUID, Buffer )
// Exports
module.exports = GUID
