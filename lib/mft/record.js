var NTFS = require( '../ntfs' )
var util = require( '../util' )

/**
 * MFT Record Constructor
 * @return {Record}
 */
function Record( buffer ) {
  
  if( !(this instanceof Record) )
    return new Record( buffer )
  
  // Usually "FILE" // u32
  this.magic = 0
  // Update Sequence Array offset
  this.usaOffset = 0
  // Update Sequence Array length
  this.usaCount = 0
  // $LogFile sequence number for this record;
  // Changed every time the record is modified
  this.lsn = 0
  // Number of times this MFT record has been reused
  this.sequenceNumber = 0
  // Number of hard links, i.e. the number of
  // directory entries referencing this record
  this.hardLinks = 0
  // Byte offset to the first attribute in this 
  // MFT record from the start of the MFT record
  this.attrOffset = 0
  // Bit array of MFT_RECORD_FLAGS. When a file
  // is deleted, the MFT_RECORD_IN_USE flag is set to zero
  this.flags = 0
  // Number of bytes used in this MFT record
  // NOTE: Must be aligned to 8-byte boundary
  this.bytesUsed = 0
  // Number of bytes allocated for this MFT record.
  // This should be equal to the MFT record size.
  this.bytesAllocated = 0
  // MFT Base Record (an MFT_REF), contains MREF and MSEQNO,
  // MREF   = baseRecord & 0xFFFFFFFFFFFF0000 (last 48 bits)
  // MSEQNO = baseRecord & 0x000000000000FFFF (first 16 bits)
  this.baseRecord = 0
  // The instance number that will be assigned to
  // the next attribute added to this MFT record
  // NOTE: Incremented each time after it is used
  // NOTE: Every time the MFT record is reused this number is set to zero
  // NOTE: The first instance number is always 0
  this.nextAttrInstance = 0
  // Reserved field (u16)
  this.reserved = 0
  // Number of this MFT record
  this.recordNumber = 0
  
  this.parse( buffer )
  
}

// MFT Record flags
Record.IN_USE = 0x0001
Record.IS_DIRECTORY = 0x0002
// Exists on all $Extend sub-files
// It seems that it marks it is a metadata file with MFT record >24,
// however, it is unknown if it is limited to metadata files only
Record.IS_4 = 0x0004
// Exists on every metafile with a non directory index,
// which means an INDEX_ROOT and an INDEX_ALLOCATION
// with a name other than "$I30".
// It is unknown if it is limited to metadata files only.
Record.IS_VIEW_INDEX = 0x0008

/**
 * MFT Record Prototype
 * @type {Object}
 */
Record.prototype = {
  
  constructor: Record,
  
  parse: function( buffer ) {
    
    if( !(buffer instanceof Buffer) )
      throw new TypeError( 'Argument must be a buffer' )
    
    if( buffer.length !== 1024 )
      throw new Error( 'Buffer must be 1KB in size' )
    
    this.parseHeader( buffer )
    this.parseAttributes( buffer.slice( this.attrOffset ) )
    
    return this
    
  },
  
  parseHeader: function( buffer ) {
    
    this.magic            = buffer.toString( 'ascii', 0, 4 )
    this.usaOffset        = buffer.readUInt16LE(  4 )
    this.usaCount         = buffer.readUInt16LE(  6 )
    this.lsn              = util.readInt64LE( buffer,  8 )
    this.sequenceNumber   = buffer.readUInt16LE( 16 )
    this.hardLinks        = buffer.readUInt16LE( 18 )
    this.attrOffset       = buffer.readUInt16LE( 20 )
    this.flags            = buffer.readUInt32LE( 22 )
    this.bytesUsed        = buffer.readUInt32LE( 24 )
    this.bytesAllocated   = buffer.readUInt32LE( 28 )
    this.baseRecord       = util.readUInt64LE( buffer, 32 )
    this.nextAttrInstance = buffer.readUInt16LE( 40 )
    this.reserved         = buffer.readUInt16LE( 42 )
    this.recordNumber     = buffer.readUInt32LE( 44 )
    
    return this
    
  },
  
  parseAttributes: function( buffer ) {
    return this
  },
  
  toBuffer: function() {
    
    var buffer = new Buffer( 1024 )
    
    new Buffer( this.magic, 'ascii' ).copy( buffer )
    
    buffer.writeUInt16LE( this.usaOffset,          4 )
    buffer.writeUInt16LE( this.usaCount,           6 )
    util.writeUInt64LE( buffer, this.lsn,          8 )
    buffer.writeUInt16LE( this.sequenceNumber,    16 )
    buffer.writeUInt16LE( this.hardLinks,         18 )
    buffer.writeUInt16LE( this.attrOffset,        20 )
    buffer.writeUInt32LE( this.flags,             22 )
    buffer.writeUInt32LE( this.bytesUsed,         24 )
    buffer.writeUInt32LE( this.bytesAllocated,    28 )
    util.writeUInt64LE( buffer, this.baseRecord,  32 )
    buffer.writeUInt16LE( this.nextAttrInstance,  40 )
    buffer.writeUInt16LE( this.reserved,          42 )
    buffer.writeUInt32LE( this.recordNumber,      44 )
    
    return buffer
    
  }
  
}

// Exports
module.exports = Record
