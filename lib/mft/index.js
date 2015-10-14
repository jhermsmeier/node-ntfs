var NTFS = require( '../ntfs' )

/**
 * Master File Table (MFT) Constructor
 * @return {MasterFileTable}
 */
function MasterFileTable( volume ) {
  
  if( !(this instanceof MasterFileTable) )
    return new MasterFileTable( volume )
  
  this.records = {}
  this.volume = volume
  
}

// MFT_REF
MasterFileTable.Ref = require( './ref' )
// MFT Record (usually 1KB)
MasterFileTable.Record = require( './record' )

/**
 * Create a new Master File Table
 * @param  {NTFS.Volume} volume
 * @return {MasterFileTable}
 */
MasterFileTable.create = function( volume ) {
  return new MasterFileTable( volume )
}

/**
 * MasterFileTable Prototype
 * @type {Object}
 */
MasterFileTable.prototype = {
  
  constructor: MasterFileTable,
  
  read: function( callback ) {
    
    var self = this
    
    // NTFS Volume Boot Record
    var vbr = this.volume.vbr
    // GPT Partition Entry
    var partition = this.volume.partition
    
    // Logical Cluster Number (LCN) of the
    // Master File Table (MFT)
    var lcn = vbr.mftLCN
    // Sectors per Cluster
    var sectorsPerCluster = vbr.sectorsPerCluster
    // MFT Offset
    var mftOffset = (lcn * sectorsPerCluster) + partition.firstLBA
    
    // TODO: Read entire MFT
    this.fs.device.readLBA(
      mftOffset, mftOffset + 2, null,
      callback
    )
    
  },
  
  write: function( callback ) {
    // TODO
  },
  
  /**
   * Allocate an inode for a new MFT record
   * @param  {???}      base_ni
   * @param  {Function} callback( err, inode )
   */
  allocateRecord: function( base_ni, callback ) {
    // TODO
  },
  
  /**
   * Read a record from the MFT
   * @param  {Number}   mref???
   * @param  {Function} callback( err, record )
   */
  readRecord: function( mref, callback ) {
    // TODO
  },
  
  checkRecord: function( callback ) {
    // TODO: ???
  },
  
  layoutRecord: function( callback ) {
    // TODO: ???
  },
  
  formatRecord: function( callback ) {
    // TODO: ???
  },
  
  /**
   * Write an MFT record into the MFT
   * @param  {MasterFileTable.Record} record
   * @param  {Function} callback( err, record )
   */
  writeRecord: function( record, callback ) {
    // TODO
  },
  
  freeRecord: function( record, callback ) {
    // TODO
  },
  
  usn_dec: function() {
    // TODO: ???
  },
  
  scale: function() {
    // TODO: Scale down MFT if drive is full.
    // Initially the MFT occupies 12% of the volume size;
    // if the volume is "full", it is attempted to resize
    // the MFT by half to make space for new files.
    // This procedure is repeated until the MFT can not
    // be reduced in size any more - the volume is completely full.
  },
  
}

// Exports
module.exports = MasterFileTable
