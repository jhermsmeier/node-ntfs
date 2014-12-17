var Int64 = require( 'int64-native' )

module.exports = {
  
  /**
   * Reads a signed 64 bit integer from a buffer
   * @param  {Buffer} buffer
   * @param  {Number} offset
   * @return {Number}
   */
  readInt64LE: function( buffer, offset ) {
    return +(new Int64(
      buffer.readUInt32LE( offset + 4 ),
      buffer.readUInt32LE( offset )
    ).toSignedDecimalString())
  },
  
  /**
   * Writes a signed 64 bit integer to a buffer
   * @param  {Buffer} buffer
   * @param  {Number} value
   * @param  {Number} offset
   * @return {Undefined}
   */
  writeInt64LE: function( buffer, value, offset ) {
    var num = new Int64( value )
    buffer.writeUInt32LE( num.low32(), offset )
    buffer.writeUInt32LE( num.high32(), offset + 4 )
  },
  
  /**
   * Reads an unsigned 64 bit integer from a buffer
   * @param  {Buffer} buffer
   * @param  {Number} offset
   * @return {Number}
   */
  readUInt64LE: function( buffer, offset ) {
    return +(new Int64(
      buffer.readUInt32LE( offset + 4 ),
      buffer.readUInt32LE( offset )
    ).toUnsignedDecimalString())
  },
  
  /**
   * Writes an unsigned 64 bit integer to a buffer
   * @param  {Buffer} buffer
   * @param  {Number} value
   * @param  {Number} offset
   * @return {Undefined}
   */
  writeUInt64LE: function( buffer, value, offset ) {
    var num = new Int64( value )
    buffer.writeUInt32LE( num.low32(), offset )
    buffer.writeUInt32LE( num.high32(), offset + 4 )
  },
  
}
