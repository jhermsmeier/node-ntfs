var util = require( '../util' )
var BN = require( 'bn.js' )

/**
 * MFT Ref Constructor (an MFT_REF)
 * MFT_REF contains MREF and MSEQNO,
 * MREF   = baseRecord & 0x0000FFFFFFFFFFFF (last 48 bits)
 * MSEQNO = baseRecord & 0xFFFF000000000000 (first 16 bits)
 * @return {MFTRef}
 */
function MFTRef( hi, lo ) {
  
  if( !(this instanceof MFTRef) )
    return new MFTRef( hi, lo )
  
  var n = new Int64( hi, lo )
  
  this.mref = +( n.and( MFTRef.MREF_MASK )
    .toUnsignedDecimalString() )
  
  this.mseqno = +( n.and( MFTRef.MSEQNO_MASK )
    .shiftRight( 48 )
    .toUnsignedDecimalString()
  )
  
}

MFTRef.MREF_MASK = new BN( '0000FFFFFFFFFFFF', 16 )
MFTRef.MSEQNO_MASK = new BN( 'FFFF000000000000', 16 )

/**
 * Create a new MFT Ref
 * @param  {Number} hi
 * @param  {Number} lo
 * @return {MFTRef}
 */
MFTRef.create = function( hi, lo ) {
  return new MFTRef( hi, lo )
}

/**
 * MFTRef Prototype
 * @type {Object}
 */
MFTRef.prototype = {
  
  constructor: MFTRef,
  
}

// Exports
module.exports = MFTRef
