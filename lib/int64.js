var int64 = module.exports
var MAX_UINT32 = Math.pow( 2, 32 )

int64.readUIntLE = function( buffer, offset ) {
  offset = offset || 0
  var hi = buffer.readUInt32LE( offset + 4 )
  var lo = buffer.readUInt32LE( offset )
  return hi * MAX_UINT32 + lo
}

int64.writeUIntLE = function( value, buffer, offset ) {
  offset = offset || 0
  var hi = Math.floor( value / MAX_UINT32 )
  var lo = ( value & 0xffffffff ) >>> 0
  buffer.writeUInt32LE( hi, offset + 4 )
  buffer.writeUInt32LE( lo, offset )
  return offset + 8
}

int64.readUIntBE = function( buffer, offset ) {
  offset = offset || 0
  var hi = buffer.readUInt32BE( offset )
  var lo = buffer.readUInt32BE( offset + 4 )
  return hi * MAX_UINT32 + lo
}

int64.writeUIntBE = function( value, buffer, offset ) {
  offset = offset || 0
  var hi = Math.floor( value / MAX_UINT32 )
  var lo = ( value & 0xffffffff ) >>> 0
  buffer.writeUInt32BE( hi, offset )
  buffer.writeUInt32BE( lo, offset + 4 )
  return offset + 8
}

int64.readIntLE = function( buffer, offset ) {
  offset = offset || 0
  var hi = buffer.readUInt32LE( offset + 4 )
  var lo = buffer.readInt32LE( offset )
  return hi * MAX_UINT32 + lo
}

int64.writeIntLE = function( value, buffer, offset ) {
  offset = offset || 0
  var hi = Math.floor( value / MAX_UINT32 )
  var lo = ( value & 0xffffffff ) >>> 0
  buffer.writeUInt32LE( hi, offset + 4 )
  buffer.writeInt32LE( lo, offset )
  return offset + 8
}

int64.readIntBE = function( buffer, offset ) {
  offset = offset || 0
  var hi = buffer.readInt32BE( offset )
  var lo = buffer.readUInt32BE( offset + 4 )
  return hi * MAX_UINT32 + lo
}

int64.writeIntBE = function( value, buffer, offset ) {
  offset = offset || 0
  var hi = Math.floor( value / MAX_UINT32 )
  var lo = ( value & 0xffffffff ) >>> 0
  buffer.writeInt32BE( hi, offset )
  buffer.writeUInt32BE( lo, offset + 4 )
  return offset + 8
}
