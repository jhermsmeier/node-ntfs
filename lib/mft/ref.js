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
  
  // value & 0x0000FFFFFFFFFFFF
  this.mref = hi & MFTRef.MREF_MASK[0] |
    lo & MFTRef.MREF_MASK[1]
  
  // value >>> 48
  this.mseqno = ( hi & MFTRef.MSEQNO_MASK ) >>> 2
  
}

MFTRef.MREF_MASK = [ 0x0000FFFF, 0xFFFFFFFF ] // 0x0000FFFFFFFFFFFF
MFTRef.MSEQNO_MASK = [ 0xFFFF0000, 0x00000000 ] // 0xFFFF000000000000

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
