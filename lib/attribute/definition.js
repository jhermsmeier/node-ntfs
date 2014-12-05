/**
 * AttributeDefinition Constructor
 * @return {AttributeDefinition}
 */
function AttributeDefinition( buffer ) {
  
  if( !(this instanceof AttributeDefinition) )
    return new AttributeDefinition( buffer )
  
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
AttributeDefinition.INDEXABLE      = 0x00000002
AttributeDefinition.MULTIPLE       = 0x00000004
AttributeDefinition.NOT_ZERO       = 0x00000008
AttributeDefinition.INDEXED_UNIQUE = 0x00000010
AttributeDefinition.NAMED_UNIQUE   = 0x00000020
AttributeDefinition.RESIDENT       = 0x00000040
AttributeDefinition.ALWAYS_LOG     = 0x00000080

/**
 * AttributeDefinition Prototype
 * @type {Object}
 */
AttributeDefinition.prototype = {
  
  constructor: AttributeDefinition,
  
  parse: function( buffer ) {
    
    this.name = buffer.toString( 'utf8', 0, 0x80 )
    this.type = buffer.readUInt32LE( 0x80 )
    this.displayRule = buffer.readUInt32LE( 0x84 )
    this.collationRules = buffer.readUInt32LE( 0x88 )
    this.flags = buffer.readUInt32LE( 0x8C )
    this.minSize = readInt64LE( buffer, 0x90 )
    this.maxSize = readInt64LE( buffer, 0x98 )
    
    return this
    
  },
  
}

// Exports
module.exports = AttributeDefinition
