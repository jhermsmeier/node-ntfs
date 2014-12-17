var util = require( '../util' )

/**
 * Attribute Definition Constructor
 * @return {Definition}
 */
function Definition( buffer ) {
  
  if( !(this instanceof Definition) )
    return new Definition( buffer )
  
  this.name = ''
  this.type = 0
  this.displayRule = 0
  this.collationRules = 0
  this.flags = 0
  this.minSize = 0
  this.maxSize = 0
  
  if( buffer != null )
    this.parse()
  
}

// 32 bit flags describing attribute properties
Definition.INDEXABLE      = 0x00000002
Definition.MULTIPLE       = 0x00000004
Definition.NOT_ZERO       = 0x00000008
Definition.INDEXED_UNIQUE = 0x00000010
Definition.NAMED_UNIQUE   = 0x00000020
Definition.RESIDENT       = 0x00000040
Definition.ALWAYS_LOG     = 0x00000080

/**
 * Attribute Definition Prototype
 * @type {Object}
 */
Definition.prototype = {
  
  constructor: Definition,
  
  parse: function( buffer ) {
    
    this.name = buffer.toString( 'utf8', 0, 0x80 )
    this.type = buffer.readUInt32LE( 0x80 )
    this.displayRule = buffer.readUInt32LE( 0x84 )
    this.collationRules = buffer.readUInt32LE( 0x88 )
    this.flags = buffer.readUInt32LE( 0x8C )
    this.minSize = util.readInt64LE( buffer, 0x90 )
    this.maxSize = util.readInt64LE( buffer, 0x98 )
    
    return this
    
  },
  
}

// Exports
module.exports = Definition
