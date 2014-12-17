var util = require( '../util' )
var Int64 = require( 'int64-native' )

/**
 * MFT Ref Constructor (an MFT_REF)
 * MFT_REF contains MREF and MSEQNO,
 * MREF   = baseRecord & 0xFFFFFFFFFFFF0000 (last 48 bits)
 * MSEQNO = baseRecord & 0x000000000000FFFF (first 16 bits)
 * @return {Ref}
 */
function Ref( hi, lo ) {
  
  if( !(this instanceof Ref) )
    return new Ref( hi, lo )
  
  var n = new Int64( hi, lo )
  
  this.mref = n.and( Ref.MREF_MASK ).toNumber()
  this.mseqno = n.and( Ref.MSEQNO_MASK ).toNumber()
  
}

// TODO: Determine if it should be
// 0xFFFF000000000000 instead (?)
Ref.MREF_MASK = new Int64( '0xFFFFFFFFFFFF0000' )
// TODO: Determine if it should be
// 0x0000FFFFFFFFFFFF instead (?)
Ref.MSEQNO_MASK = new Int64( '0x000000000000FFFF' )

/**
 * Ref Prototype
 * @type {Object}
 */
Ref.prototype = {
  
  constructor: Ref,
  
}

// Exports
module.exports = Ref
