var util = require( '../util' )
var Int64 = require( 'int64-native' )

/**
 * MFT Ref Constructor (an MFT_REF)
 * MFT_REF contains MREF and MSEQNO,
 * MREF   = baseRecord & 0x0000FFFFFFFFFFFF (last 48 bits)
 * MSEQNO = baseRecord & 0xFFFF000000000000 (first 16 bits)
 * @return {Ref}
 */
function Ref( hi, lo ) {
  
  if( !(this instanceof Ref) )
    return new Ref( hi, lo )
  
  var n = new Int64( hi, lo )
  
  this.mref = +( n.and( Ref.MREF_MASK )
    .toUnsignedDecimalString() )
  
  this.mseqno = +( n.and( Ref.MSEQNO_MASK )
    .shiftRight( 48 )
    .toUnsignedDecimalString()
  )
  
}

Ref.MREF_MASK = new Int64( '0x0000FFFFFFFFFFFF' )
Ref.MSEQNO_MASK = new Int64( '0xFFFF000000000000' )

/**
 * Ref Prototype
 * @type {Object}
 */
Ref.prototype = {
  
  constructor: Ref,
  
}

// Exports
module.exports = Ref
