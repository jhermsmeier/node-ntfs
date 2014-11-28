var Int64 = require( 'int64-native' )

/**
 * MFTRecord Constructor
 * @return {MFTRecord}
 */
function MFTRecord() {
  
  if( !(this instanceof MFTRecord) )
    return new MFTRecord()
  
  Buffer.call( this, 48 )
  
}

/**
 * MFTRecord Prototype
 * @type {Object}
 */
MFTRecord.prototype = {
  
  constructor: MFTRecord,
  
  // Usually "FILE" // u32
  get magic() {
    return this.toString( 'ascii', 0, 4 )
  },
  
  // ...
  get usa_ofs() {
    return this.readUInt16LE( 4 )
  },
  
  // ...
  get usa_count() {
    return this.readUInt16LE( 6 )
  },
  
  // $LogFile sequence number for this record;
  // Changed every time the record is modified
  get lsn() {
    return this.readUInt64LE( 8 )
  },
  
  // Number of times this mft record has been reused
  get sequenceNumber() {
    return this.readUInt16LE( 16 )
  },
  
  // Number of hard links, i.e. the number of
  // directory entries referencing this record
  get linkCount() {
    return this.readUInt16LE( 18 )
  },
  
  // Byte offset to the first attribute in this 
  // mft record from the start of the mft record
  get attrOffset() {
    return this.readUInt16LE( 20 )
  },
  
  // Bit array of MFT_RECORD_FLAGS. When a file
  // is deleted, the MFT_RECORD_IN_USE flag is set to zero
  get flags() {
    return this.readUInt32LE( 22 )
  },
  
  // Number of bytes used in this mft record
  // NOTE: Must be aligned to 8-byte boundary
  get bytesInUse() {
    return this.readUInt32LE( 24 )
  },
  
  // Number of bytes allocated for this mft record.
  // This should be equal to the mft record size.
  get bytesAllocated() {
    return this.readUInt32LE( 28 )
  },
  
  get baseMFTRecord() {
    return this.readUInt64LE( 32 )
  },
  
  // The instance number that will be assigned to
  // the next attribute added to this mft record
  // NOTE: Incremented each time after it is used
  // NOTE: Every time the mft record is reused this number is set to zero
  // NOTE: The first instance number is always 0
  get nextAttrInstance() {
    return this.readUInt16LE( 40 )
  },
  
  // reserved // u16
  
  // Number of this mft record
  get mftRecordNumber() {
    return this.readUInt32LE( 44 )
  },
  
  readUInt64LE: function( offset ) {
    return +(new Int64(
      this.readUInt32BE( offset ),
      this.readUInt32BE( offset + 4 )
    ).toUnsignedDecimalString())
  },
  
  valueOf: function() {
    return {
      magic: this.magic,
      usa_ofs: this.usa_ofs,
      usa_count: this.usa_count,
      lsn: this.lsn,
      sequenceNumber: this.sequenceNumber,
      linkCount: this.linkCount,
      attrOffset: this.attrOffset,
      flags: this.flags,
      bytesInUse: this.bytesInUse,
      bytesAllocated: this.bytesAllocated,
      baseMFTRecord: this.baseMFTRecord,
      nextAttrInstance: this.nextAttrInstance,
      mftRecordNumber: this.mftRecordNumber,
    }
  },
  
  inspect: function() {
    return '<Buffer ' +
      require( 'util' ).inspect( this.valueOf(), {
        colors: true,
        depth: null
      }) + '>'
  },
  
}

// Inherit from Buffer
MFTRecord.prototype.__proto__ =
  Buffer.prototype

// Exports
module.exports = MFTRecord
