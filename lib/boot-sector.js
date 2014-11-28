var Int64 = require( 'int64-native' )

/**
 * BootSector Constructor
 * @return {BootSector}
 */
function BootSector() {
  
  if( !(this instanceof BootSector) )
    return new BootSector()
  
  Buffer.call( this, 512 )
  
}

/**
 * BootSector Prototype
 * @type {Object}
 */
BootSector.prototype = {
  
  constructor: BootSector,
  
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
    return +(new Int64(
      this.readUInt32BE( 40 ),
      this.readUInt32BE( 44 )
    ).toUnsignedDecimalString())
  },
  
  get mftLocation() {
    return +(new Int64(
      this.readUInt32BE( 48 ),
      this.readUInt32BE( 52 )
    ).toUnsignedDecimalString())
  },
  
  get mftMirror() {
    return +(new Int64(
      this.readUInt32BE( 56 ),
      this.readUInt32BE( 60 )
    ).toUnsignedDecimalString())
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
  
  valueOf: function() {
    return {
      jmp: this.jmp,
      OEMID: this.OEMID,
      bpb: this.bpb,
      physicalDrive: this.physicalDrive,
      currentHead: this.currentHead,
      extendedBootSignature: this.extendedBootSignature,
      numberOfSectors: this.numberOfSectors,
      mftLocation: this.mftLocation,
      mftMirror: this.mftMirror,
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
BootSector.prototype.__proto__ =
  Buffer.prototype

// Exports
module.exports = BootSector
