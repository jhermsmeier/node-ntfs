var util = require( '../util' )

/**
 * Attribute Constructor
 * @return {Attribute}
 */
function Attribute( buffer ) {
  
  if( !(this instanceof Attribute) )
    return new Attribute( buffer )
  
  this.type               = Attribute.UNUSED
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

// Resident Attribute flags (u8)
Attribute.INDEXED = 0x01

// General Attribute flags (u16)
Attribute.COMPRESSED       = 0x0001
Attribute.ENCRYPTED        = 0x4000
Attribute.SPARSE           = 0x8000
Attribute.COMPRESSION_MASK = 0x00ff

/**
 * NTFS.ATTR_TYPES: System defined attributes (u32)
 *
 * Each attribute type has a corresponding attribute name
 * (Unicode string of maximum 64 character length) as described by
 * the attribute definitions present in the data attribute of
 * the $AttrDef system file
 * 
 * On NTFS 3.0 volumes the names are just as
 * the types are named in the below enum,
 * exchanging AT_ for the dollar sign ($)
 * 
 * @type {Object}
 */
Attribute.UNUSED                       = 0x00000000
Attribute.STANDARD_INFORMATION         = 0x00000010
Attribute.ATTRIBUTE_LIST               = 0x00000020
Attribute.FILE_NAME                    = 0x00000030
Attribute.OBJECT_ID                    = 0x00000040
Attribute.SECURITY_DESCRIPTOR          = 0x00000050
Attribute.VOLUME_NAME                  = 0x00000060
Attribute.VOLUME_INFORMATION           = 0x00000070
Attribute.DATA                         = 0x00000080
Attribute.INDEX_ROOT                   = 0x00000090
Attribute.INDEX_ALLOCATION             = 0x000000A0
Attribute.BITMAP                       = 0x000000B0
Attribute.REPARSE_POINT                = 0x000000C0
Attribute.EA_INFORMATION               = 0x000000D0
Attribute.EA                           = 0x000000E0
Attribute.PROPERTY_SET                 = 0x000000F0
Attribute.LOGGED_UTILITY_STREAM        = 0x00000100
Attribute.FIRST_USER_DEFINED_ATTRIBUTE = 0x00001000
Attribute.END                          = 0xFFFFFFFF

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
  
  var name = ''
  
  switch( type ) {
    case 0x00000000: name = 'UNUSED'; break
    case 0x00000010: name = 'STANDARD_INFORMATION'; break
    case 0x00000020: name = 'ATTRIBUTE_LIST'; break
    case 0x00000030: name = 'FILE_NAME'; break
    case 0x00000040: name = 'OBJECT_ID'; break
    case 0x00000050: name = 'SECURITY_DESCRIPTOR'; break
    case 0x00000060: name = 'VOLUME_NAME'; break
    case 0x00000070: name = 'VOLUME_INFORMATION'; break
    case 0x00000080: name = 'DATA'; break
    case 0x00000090: name = 'INDEX_ROOT'; break
    case 0x000000A0: name = 'INDEX_ALLOCATION'; break
    case 0x000000B0: name = 'BITMAP'; break
    case 0x000000C0: name = 'REPARSE_POINT'; break
    case 0x000000D0: name = 'EA_INFORMATION'; break
    case 0x000000E0: name = 'EA'; break
    case 0x000000F0: name = 'PROPERTY_SET'; break
    case 0x00000100: name = 'LOGGED_UTILITY_STREAM'; break
    case 0x00001000: name = 'FIRST_USER_DEFINED_ATTRIBUTE'; break
    case 0xFFFFFFFF: name = 'END'; break
  }
  
  return name
  
}

/**
 * Attribute Prototype
 * @type {Object}
 */
Attribute.prototype = {
  
  constructor: Attribute,
  
  get isResident() {
    return !this.nonResident
  },
  
  get isCompressed() {
    return this.flags & Attribute.COMPRESSED
  },
  
  get isEncrypted() {
    return this.flags & Attribute.ENCRYPTED
  },
  
  get isSparse() {
    return this.flags & Attribute.SPARSE
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
    if( this.isResident ) {
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
