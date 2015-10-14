var Time = module.exports
var Int64 = require( 'int64-native' )
var NTFS = require( './ntfs' )

Time.toNumberString = function( time ) {
  return ( time + NTFS.TIME_OFFSET )
    .toString() + '0000'
}

Time.toInt64 = function( time ) {
  return new Int64( Time.toNumberString( time ) )
}

Time.toBuffer = function( buffer, date, offset ) {
  
  var time = date instanceof Date ?
    date.getTime() : date
  
  var int64 = Time.toInt64( time )
  
  buffer.writeUInt32LE( time.high32(), offset + 4 )
  buffer.writeUInt32LE( time.low32(), offset )
  
}

Time.fromBuffer = function( buffer, offset ) {
  
  // Read the signed 64 bit time value
  var int64 = new Int64(
    buffer.readUInt32LE( offset + 4 ),
    buffer.readUInt32LE( offset )
  )
  
  // Convert from 100ns (microsecond)
  // intervals to milliseconds
  var microseconds = int64.toSignedDecimalString()
  var milliseconds = microseconds.substring( 0, microseconds.length - 4 )
  // Convert String -> Number
  var time = parseInt( milliseconds, 10 ) - NTFS.TIME_OFFSET
  
  return new Date( time )
  
}
