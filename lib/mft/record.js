var Int64 = require( 'int64-native' )

/**
 * Master File Table Record
 * @return {MFTRecord}
 */
function MFTRecord() {
  
  if( !(this instanceof MFTRecord) )
    return new MFTRecord()
  
  // Inherit from Buffer
  // and init sizeof( 48 )
  Buffer.call( this, 48 )
  // Zero it out
  this.fill( 0 )
  
}

// MFT Record flags
MFTRecord.IN_USE        = 0x0001
MFTRecord.IS_DIRECTORY  = 0x0002
// Exists on all $Extend sub-files
// It seems that it marks it is a metadata file with MFT record >24,
// however, it is unknown if it is limited to metadata files only
MFTRecord.IS_4          = 0x0004
// Exists on every metafile with a non directory index,
// which means an INDEX_ROOT and an INDEX_ALLOCATION
// with a name other than "$I30".
// It is unknown if it is limited to metadata files only.
MFTRecord.IS_VIEW_INDEX = 0x0008

/**
 * MFTRecord Prototype
 * @type {Object}
 */
MFTRecord.prototype = {
  
  constructor: MFTRecord,
  
  // Usually "FILE" // u32
  get magic() {
    // return this.readUInt32LE( 0 )
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
  
  readInt64LE: function( offset ) {
    return +(new Int64(
      this.readInt32LE( offset + 4 ),
      this.readInt32LE( offset )
    ).toSignedDecimalString())
  },
  
  readUInt64LE: function( offset ) {
    return +(new Int64(
      this.readUInt32LE( offset + 4 ),
      this.readUInt32LE( offset )
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
