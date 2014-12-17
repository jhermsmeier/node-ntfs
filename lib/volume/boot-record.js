var NTFS = require( '../ntfs' )
var util = require( '../util' )

/**
 * Volume BootRecord Constructor
 * @return {BootRecord}
 */
function BootRecord( options ) {
  
  if( !(this instanceof BootRecord) )
    return new BootRecord( options )
  
  this.jmp = new Buffer([ 0xEB, 0x58, 0x90 ])
  this.oemId = NTFS.OEM_ID
  
  // BIOS Parameter Block (BPB) (0x0B-0x24)
  this.bytesPerSector = 0
  this.sectorsPerCluster = 0
  this.reservedSectors = 0
  this.numberOfFATs = 0
  this.rootEntries = 0
  this.totalSectors = 0
  this.mediaType = 0
  this.sectorsPerFAT = 0
  this.sectorsPerTrack = 0
  this.headsPerTrack = 0
  this.hiddenSectors = 0
  this.largeSectors = 0
  
  this.physicalDrive = 0
  this.currentHead = 0
  this.extendedBootSignature = 0
  this.numberOfSectors = 0
  this.mftLCN = 0
  this.mftMirrorLCN = 0
  this.clustersPerMFTRecord = 0
  this.clustersPerIndexRecord = 0
  
  this.serialNumber = new Buffer( 8 )
  this.serialNumber.fill( 0 )
  
  this.checksum = 0
  
  // Boot code (at 0x54 (84))
  this.bootCode = new Buffer( 426 )
  this.bootCode.fill( 0 )
  
  this.endOfSectorMarker = 0
  
}

BootRecord.parse = function( buffer ) {
  return new BootRecord().parse( buffer )
}

/**
 * Volume BootRecord Prototype
 * @type {Object}
 */
BootRecord.prototype = {
  
  constructor: BootRecord,
  
  parse: function( buffer ) {
    
    this.jmp = buffer.slice( 0, 3 )
    this.oemId = buffer.toString( 'ascii', 3, 11 )
    
    this.bytesPerSector    = buffer.readUInt16LE( 11 )
    this.sectorsPerCluster = buffer.readUInt8( 13 )
    this.reservedSectors   = buffer.readUInt16LE( 14 )
    this.numberOfFATs      = buffer.readUInt8( 16 )
    this.rootEntries       = buffer.readUInt16LE( 17 )
    this.totalSectors      = buffer.readUInt16LE( 19 )
    this.mediaType         = buffer.readUInt8( 21 )
    this.sectorsPerFAT     = buffer.readUInt16LE( 22 )
    this.sectorsPerTrack   = buffer.readUInt16LE( 24 )
    this.headsPerTrack     = buffer.readUInt16LE( 26 )
    this.hiddenSectors     = buffer.readUInt32LE( 28 )
    this.largeSectors      = buffer.readUInt32LE( 32 )
    
    this.physicalDrive          = buffer.readUInt8( 36 )
    this.currentHead            = buffer.readUInt8( 37 )
    this.extendedBootSignature  = buffer.readUInt8( 38 )
    this.numberOfSectors        = util.readInt64LE( buffer, 40 )
    this.mftLCN                 = util.readInt64LE( buffer, 48 )
    this.mftMirrorLCN           = util.readInt64LE( buffer, 56 )
    this.clustersPerMFTRecord   = buffer.readInt8( 64 )
    this.clustersPerIndexRecord = buffer.readInt8( 68 )
    
    this.serialNumber = buffer.slice( 72, 80 )
    
    this.checksum = buffer.readUInt32LE( 80 )
    
    this.bootCode = buffer.slice( 84, 84 + 426 )
    
    this.endOfSectorMarker = buffer.readUInt16LE( 510 )
    
    return this
    
  },
  
  toBuffer: function() {
    
    var buffer = new Buffer( 512 )
    
    this.jmp = buffer.slice( 0, 3 )
    this.oemId = buffer.toString( 'ascii', 3, 11 )
    
    buffer.writeUInt16LE( this.bytesPerSector, 11 )
    buffer.writeUInt8( this.sectorsPerCluster, 13 )
    buffer.writeUInt16LE( this.reservedSectors, 14 )
    buffer.writeUInt8( this.numberOfFATs, 16 )
    buffer.writeUInt16LE( this.rootEntries, 17 )
    buffer.writeUInt16LE( this.totalSectors, 19 )
    buffer.writeUInt8( this.mediaType, 21 )
    buffer.writeUInt16LE( this.sectorsPerFAT, 22 )
    buffer.writeUInt16LE( this.sectorsPerTrack, 24 )
    buffer.writeUInt16LE( this.headsPerTrack, 26 )
    buffer.writeUInt32LE( this.hiddenSectors, 28 )
    buffer.writeUInt32LE( this.largeSectors, 32 )
    
    buffer.writeUInt8( this.physicalDrive, 36 )
    buffer.writeUInt8( this.currentHead, 37 )
    buffer.writeUInt8( this.extendedBootSignature, 38 )
    util.writeInt64LE( buffer, this.numberOfSectors, 40 )
    util.writeInt64LE( buffer, this.mftLCN, 48 )
    util.writeInt64LE( buffer, this.mftMirrorLCN, 56 )
    buffer.writeInt8( this.clustersPerMFTRecord, 64 )
    buffer.writeInt8( this.clustersPerIndexRecord, 68 )
    
    this.serialNumber.copy( buffer, 0, 72, 80 )
    
    this.checksum = buffer.readUInt32LE( 80 )
    
    this.bootCode.copy( buffer, 0, 84, 84 + 426 )
    
    this.endOfSectorMarker = buffer.readUInt16LE( 510 )
    
    return buffer
    
  },
  
}

// Exports
module.exports = BootRecord
