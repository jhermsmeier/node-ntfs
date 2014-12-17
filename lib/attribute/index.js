var util = require( '../util' )

/**
 * Attribute Constructor
 * @return {Attribute}
 */
function Attribute( buffer ) {
  
  if( !(this instanceof Attribute) )
    return new Attribute( buffer )
  
  this.type               = Attribute.TYPE.UNUSED
  this.typeName           = ''
  this.length             = 24
  this.nonResident        = 0
  this.nameLength         = 0
  this.nameOffset         = 24
  this.name               = ''
  
  // Resident fields
  this.flags              = 0
  this.instance           = 0
  this.valueLength        = 0
  this.valueOffset        = 24
  
  // Non-Resident fields
  this.residentFlags      = null
  this.lowVCN             = null
  this.highVCN            = null
  this.mappingPairsOffset = null
  this.compressionUnit    = null
  this.allocatedSize      = null
  this.dataSize           = null
  this.initializedSize    = null
  this.compressedSize     = null
  
  if( buffer != null )
    this.parse( buffer )
  
}

// Resident Attribute flags // u8
Attribute.IS_INDEXED = 0x01

// General Attribute flags // u16
Attribute.IS_COMPRESSED    = 0x0001
Attribute.IS_ENCRYPTED     = 0x4000
Attribute.IS_SPARSE        = 0x8000
Attribute.COMPRESSION_MASK = 0x00ff

// NTFS.ATTR_TYPES: System defined attribute types (u32)
Attribute.TYPE = require( '../enum/attr-types' )

/**
 * AttrDef Structure
 * @type {Function}
 */
Attribute.Definition = require( './definition' )

/**
 * Retrieves human readable attribute type name
 * @param  {Number} type
 * @return {String}
 */
Attribute.getTypeName = function( type ) {
  return Object.keys( Attribute.TYPE )
    .filter( function( name ) {
      return type === Attribute.TYPE[ name ]
    })[0]
}

/**
 * Attribute Prototype
 * @type {Object}
 */
Attribute.prototype = {
  
  constructor: Attribute,
  
  get isCompressed() {
    return this.flags & Attribute.IS_COMPRESSED
  },
  
  get isEncrypted() {
    return this.flags & Attribute.IS_ENCRYPTED
  },
  
  get isSparse() {
    return this.flags & Attribute.IS_SPARSE
  },
  
  get compressionMask() {
    return this.flags & Attribute.COMPRESSION_MASK
  },
  
  parse: function( buffer ) {
    
    this.type = buffer.readUInt32LE( 0 )
    this.typeName = Attribute.getTypeName( this.type )
    
    this.length      = buffer.readUInt32LE( 4 )
    this.nonResident = buffer.readUInt8( 8 )
    this.nameLength  = buffer.readUInt8( 9 )
    this.nameOffset  = buffer.readUInt16LE( 10 )
    
    if( this.nameLength > 0 ) {
      this.name = buffer.toString( 'utf8',
        this.nameOffset,
        this.nameOffset + this.nameLength
      )
    }
    
    this.flags    = buffer.readUInt16LE( 12 )
    this.instance = buffer.readUInt16LE( 14 )
    
    // union( resident / non-resident )
    if( this.nonResident === 0 ) {
      this.valueLength   = buffer.readUInt32LE( 16 )
      this.valueOffset   = buffer.readUInt16LE( 20 )
      this.residentFlags = buffer.readUInt8( 22 )
      // 1 byte reserved / alignment
      // End Of Record Header at 24 bytes
    } else {
      // Lowest valid Virtual Cluster Number
      this.lowVCN             = util.readUInt64LE( buffer, 16 )
      // Highest valid Virtual Cluster Number
      this.highVCN            = util.readUInt64LE( buffer, 24 )
      this.mappingPairsOffset = buffer.readUInt16LE( 32 )
      this.compressionUnit    = buffer.readUInt8( 34 )
      // 5 bytes reserved / alignment
      this.allocatedSize      = util.readInt64LE( buffer, 40 )
      this.dataSize           = util.readInt64LE( buffer, 48 )
      this.initializedSize    = util.readInt64LE( buffer, 56 )
      this.compressedSize     = util.readInt64LE( buffer, 64 )
      // End oF Record Header at 64 bytes
    }
    
    return this
    
  },
  
}

// Exports
module.exports = Attribute
