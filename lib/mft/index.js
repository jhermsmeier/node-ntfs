/**
 * Master File Table (MFT) Constructor
 * @return {MFT}
 */
function MFT() {
  
  if( !(this instanceof MFT) )
    return new MFT()
  
  this.records = []
  
}

// MFT Record (48 bytes)
MFT.Record = require( './mft-record' )

/**
 * MFT Prototype
 * @type {Object}
 */
MFT.prototype = {
  
  constructor: MFT,
  
}

// Exports
module.exports = MFT
