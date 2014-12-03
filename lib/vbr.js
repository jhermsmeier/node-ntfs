var Int64 = require( 'int64-native' )

/**
 * VolumeBootRecord Constructor
 * @return {VolumeBootRecord}
 */
function VolumeBootRecord() {
  
  if( !(this instanceof VolumeBootRecord) )
    return new VolumeBootRecord()
  
  // Inherit from Buffer
  // and init sizeof( 512 )
  Buffer.call( this, 512 )
  // Zero it out
  this.fill( 0 )
  
}

/**
 * VolumeBootRecord Prototype
 * @type {Object}
 */
VolumeBootRecord.prototype = {
  
  constructor: VolumeBootRecord,
  
  get jmp() {
    return this.slice( 0, 3 )
  },
  
  get OEMID() {
    return this.toString( 'ascii', 3, 11 )
  },
  
  get bpb() {
    return {
      bytesPerSector: this.readUInt16LE( 11 ),
      sectorsPerCluster: this.readUInt8( 13 ),
      reservedSectors: this.readUInt16LE( 14 ),
      numberOfFATs: this.readUInt8( 16 ),
      rootEntries: this.readUInt16LE( 17 ),
      numberOfSectors: this.readUInt16LE( 19 ),
      mediaType: this.readUInt8( 21 ),
      sectorsPerFAT: this.readUInt16LE( 22 ),
      sectorsPerTrack: this.readUInt16LE( 24 ),
      headsPerTrack: this.readUInt16LE( 26 ),
      hiddenSectors: this.readUInt32LE( 28 ),
      largeSectors: this.readUInt32LE( 32 ),
    }
  },
  
  get physicalDrive() {
    return this.readUInt8( 36 )
  },
  
  get currentHead() {
    return this.readUInt8( 37 )
  },
  
  get extendedBootSignature() {
    return this.readUInt8( 38 )
  },
  
  get numberOfSectors() {
    return this.readInt64LE( 40 )
    // return +(new Int64(
    //   this.readUInt32BE( 44 ),
    //   this.readUInt32BE( 40 )
    // ).toSignedDecimalString())
  },
  
  get mftLCN() {
    return this.readInt64LE( 48 )
    // return +(new Int64(
    //   this.readUInt32BE( 52 ),
    //   this.readUInt32BE( 48 )
    // ).toSignedDecimalString())
  },
  
  get mftMirrorLCN() {
    return this.readInt64LE( 56 )
    // return +(new Int64(
    //   this.readUInt32BE( 60 ),
    //   this.readUInt32BE( 56 )
    // ).toSignedDecimalString())
  },
  
  get clustersPerMFTRecord() {
    return this.readUInt8( 64 )
  },
  
  // reserved [u8][3]
  
  get clustersPerIndexRecord() {
    return this.readUInt8( 68 )
  },
  
  // reserved [u8][3]
  
  get serialNumber() {
    return this.slice( 72, 80 )
  },
  
  get checksum() {
    return this.readUInt32LE( 80 )
  },
  
  get bootCode() {
    return this.slice( 84, 84 + 426 )
  },
  
  get endOfSectorMarker() {
    return this.readUInt16LE( 510 )
  },
  
  readInt64LE: function( offset ) {
    return +(new Int64(
      this.readUInt32BE( offset + 4 ),
      this.readUInt32BE( offset )
    ).toSignedDecimalString())
  },
  
  readUInt64LE: function( offset ) {
    return +(new Int64(
      this.readUInt32BE( offset + 4 ),
      this.readUInt32BE( offset )
    ).toUnsignedDecimalString())
  },
  
  valueOf: function() {
    return {
      jmp: this.jmp,
      OEMID: this.OEMID,
      bpb: this.bpb,
      physicalDrive: this.physicalDrive,
      currentHead: this.currentHead,
      extendedBootSignature: this.extendedBootSignature,
      numberOfSectors: this.numberOfSectors,
      mftLCN: this.mftLCN,
      mftMirrorLCN: this.mftMirrorLCN,
      clustersPerMFTRecord: this.clustersPerMFTRecord,
      serialNumber: this.serialNumber,
      checksum: this.checksum,
      bootCode: this.bootCode,
      endOfSectorMarker: this.endOfSectorMarker,
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
VolumeBootRecord.prototype.__proto__ =
  Buffer.prototype

// Exports
module.exports = VolumeBootRecord
