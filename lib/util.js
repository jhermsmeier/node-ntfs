module.exports = {
  
  readIntLE: function( buffer, offset, byteLength ) {
    
    offset = offset >>> 0
    byteLength = byteLength >>> 0
    
    var val = buffer[ offset ]
    var mul = 1
    var i = 0
    
    while( ++i < byteLength && ( mul *= 0x100 ) ) {
      val += buffer[ offset + i ] * mul
    }
    
    mul *= 0x80

    if( val >= mul ) {
      val -= Math.pow(2, 8 * byteLength)
    }

    return val
    
  },
  
  readIntBE: function( buffer, offset, byteLength ) {
    
    offset = offset >>> 0
    byteLength = byteLength >>> 0
    
    var i = byteLength
    var mul = 1
    var val = buffer[ offset + --i ]
    
    while( i > 0 && ( mul *= 0x100 ) ) {
      val += buffer[ offset + --i ] * mul
    }
    
    mul *= 0x80

    if( val >= mul ) {
      val -= Math.pow( 2, 8 * byteLength )
    }

    return val
    
  },
  
  /**
   * Reads a signed 64 bit integer from a buffer
   * @param  {Buffer} buffer
   * @param  {Number} offset
   * @return {Number}
   */
  readInt64LE: function( buffer, offset ) {
    return buffer.readIntLE( offset, 8 )
    // return +(new Int64(
    //   buffer.readUInt32LE( offset + 4 ),
    //   buffer.readUInt32LE( offset )
    // ).toSignedDecimalString())
  },
  
  /**
   * Writes a signed 64 bit integer to a buffer
   * @param  {Buffer} buffer
   * @param  {Number} value
   * @param  {Number} offset
   * @return {Undefined}
   */
  writeInt64LE: function( buffer, value, offset ) {
    return buffer.writeIntLE( value, offset, 8 )
    // var num = new Int64( value )
    // buffer.writeUInt32LE( num.low32(), offset )
    // buffer.writeUInt32LE( num.high32(), offset + 4 )
  },
  
  /**
   * Reads an unsigned 64 bit integer from a buffer
   * @param  {Buffer} buffer
   * @param  {Number} offset
   * @return {Number}
   */
  readUInt64LE: function( buffer, offset ) {
    return buffer.readUIntLE( offset, 8 )
    // return +(new Int64(
    //   buffer.readUInt32LE( offset + 4 ),
    //   buffer.readUInt32LE( offset )
    // ).toUnsignedDecimalString())
  },
  
  /**
   * Writes an unsigned 64 bit integer to a buffer
   * @param  {Buffer} buffer
   * @param  {Number} value
   * @param  {Number} offset
   * @return {Undefined}
   */
  writeUInt64LE: function( buffer, value, offset ) {
    return buffer.writeUIntLE( value, offset, 8 )
    // var num = new Int64( value )
    // buffer.writeUInt32LE( num.low32(), offset )
    // buffer.writeUInt32LE( num.high32(), offset + 4 )
  },
  
}
