class MFTRef {
  
  /**
   * MFT Ref Constructor (an MFT_REF)
   * MFT_REF contains MREF and MSEQNO,
   * MREF   = baseRecord & 0x0000FFFFFFFFFFFF (last 48 bits)
   * MSEQNO = baseRecord & 0xFFFF000000000000 (first 16 bits)
   * @param {Number} hi
   * @param {Number} lo
   * @returns {MFTRef}
   */
  constructor( hi, lo ) {
    
    /** @type {Number} value & 0x0000FFFFFFFFFFFF */
    this.mref = hi & MFTRef.MREF_MASK[0] |
      MFTRef.MREF_MASK[1]
    
    /** @type {Number} value >>> 48 */
    this.mseqno = ( hi & MFTRef.MSEQNO_MASK ) >>> 2
    
  }
  
}

// 0x0000FFFFFFFFFFFF
MFTRef.MREF_MASK = [ 0x0000FFFF, 0xFFFFFFFF ]
// 0xFFFF000000000000
MFTRef.MSEQNO_MASK = [ 0xFFFF0000, 0x00000000 ]

module.exports = MFTRef
