var NTFS = require( '../ntfs' )
var int64 = require( '../int64' )

class MFTRecord {
  
  constructor() {
    
    /** @type {Number} Usually "FILE" // u32 */
    this.magic = 0
    /** @type {Number} Update Sequence Array offset */
    this.usaOffset = 0
    /** @type {Number} Update Sequence Array length */
    this.usaCount = 0
    /**
     * $LogFile sequence number for this record;
     * Changed every time the record is modified
     * @type {Number}
     */
    this.lsn = 0
    /** @type {Number} Number of times this MFT record has been reused */
    this.sequenceNumber = 0
    /**
     * Number of hard links, i.e. the number of
     * directory entries referencing this record
     * @type {Number}
     */
    this.hardLinks = 0
    /**
     * Byte offset to the first attribute in this 
     * MFT record from the start of the MFT record
     * @type {Number}
     */
    this.attrOffset = 0
    /**
     * Bit array of MFT_RECORD_FLAGS. When a file
     * is deleted, the MFT_RECORD_IN_USE flag is set to zero
     * @type {Number}
     */
    this.flags = 0
    /**
     * Number of bytes used in this MFT record
     * NOTE: Must be aligned to 8-byte boundary
     * @type {Number}
     */
    this.bytesUsed = 0
    /**
     * Number of bytes allocated for this MFT record.
     * This should be equal to the MFT record size.
     * @type {Number}
     */
    this.bytesAllocated = 0
    /**
     * MFT Base Record (an MFT_REF), contains MREF and MSEQNO,
     * MREF   = baseRecord & 0xFFFFFFFFFFFF0000 (last 48 bits)
     * MSEQNO = baseRecord & 0x000000000000FFFF (first 16 bits
     * @type {Number}
     */
    this.baseRecord = 0
    /**
     * The instance number that will be assigned to
     * the next attribute added to this MFT record
     * NOTE: Incremented each time after it is used
     * NOTE: Every time the MFT record is reused this number is set to zero
     * NOTE: The first instance number is always 0
     * @type {Number}
     */
    this.nextAttrInstance = 0
    /** @type {Number} Reserved field (u16) */
    this.reserved = 0
    /** @type {Number} Number of this MFT record */
    this.recordNumber = 0
    
    // TODO: ????
    this.attributes = null
    
  }
  
  static encode( record, buffer, offset ) {
    
    offset = offset || 0
    buffer = buffer || Buffer.alloc( 1024 )
    
    offset = buffer.writeUInt16LE( record.usaOffset, offset )
    offset = buffer.writeUInt16LE( record.usaCount, offset )
    offset = int64.writeUInt64LE( record.lsn, buffer, offset )
    offset = buffer.writeUInt16LE( record.sequenceNumber, offset )
    offset = buffer.writeUInt16LE( record.hardLinks, offset )
    offset = buffer.writeUInt16LE( record.attrOffset, offset )
    offset = buffer.writeUInt32LE( record.flags, offset )
    offset = buffer.writeUInt32LE( record.bytesUsed, offset )
    offset = buffer.writeUInt32LE( record.bytesAllocated, offset )
    offset = int64.writeUInt64LE( record.baseRecord, buffer, offset )
    offset = buffer.writeUInt16LE( record.nextAttrInstance, offset )
    offset = buffer.writeUInt16LE( record.reserved, offset )
    offset = buffer.writeUInt32LE( record.recordNumber, offset )
    
    // TODO: Attributes (???)
    
    return buffer
    
  }
  
  static decode( buffer, offset, length ) {
    return new MFTRecord().parse( buffer, offset, length )
  }
  
  parse( buffer, offset ) {
    
    if( !Buffer.isBuffer( buffer ) ) {
      throw new Error( 'Argument must be a buffer' )
    }
    
    if( buffer.length != 1024 ) {
      throw new Error( `Buffer must be at least 1KB in size` )
    }
    
    this.magic = Buffer.readUInt32LE( offset + 0 )
    this.usaOffset = buffer.readUInt16LE( offset + 4 )
    this.usaCount = buffer.readUInt16LE( offset + 6 )
    this.lsn = int64.readInt64LE( buffer, offset + 8 )
    this.sequenceNumber = buffer.readUInt16LE( offset + 16 )
    this.hardLinks = buffer.readUInt16LE( offset + 18 )
    this.attrOffset = buffer.readUInt16LE( offset + 20 )
    this.flags = buffer.readUInt32LE( offset + 22 )
    this.bytesUsed = buffer.readUInt32LE( offset + 24 )
    this.bytesAllocated = buffer.readUInt32LE( offset + 28 )
    
    // this.baseRecord = int64.readUInt64LE( buffer, offset + 32 )
    this.baseRecord = new NTFS.MFT.Ref(
      buffer.readUInt32LE( offset + 32 + 4 ),
      buffer.readUInt32LE( offset + 32 )
    )
    
    this.nextAttrInstance = buffer.readUInt16LE( offset + 40 )
    this.reserved = buffer.readUInt16LE( offset + 42 )
    this.recordNumber = buffer.readUInt32LE( offset + 44 )
    
    // TODO: Attributes (???)
    
    return this
    
  }
  
  write( buffer, offset ) {
    return MFTRecord.encode( this, buffer, offset )
  }
  
}

// MFT Record flags
MFTRecord.IN_USE = 0x0001
MFTRecord.IS_DIRECTORY = 0x0002
// Exists on all $Extend sub-files
// It seems that it marks it is a metadata file with MFT record >24,
// however, it is unknown if it is limited to metadata files only
MFTRecord.IS_4 = 0x0004
// Exists on every metafile with a non directory index,
// which means an INDEX_ROOT and an INDEX_ALLOCATION
// with a name other than "$I30".
// It is unknown if it is limited to metadata files only.
MFTRecord.IS_VIEW_INDEX = 0x0008

module.exports = MFTRecord
