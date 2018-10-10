var util = require( 'util' )

function hex( value, size ) {
  return ( '000000000000' + value.toString( 16 ).toUpperCase() ).substr( -size )
}

class GUID {
  
  constructor( value, offset ) {
    
    this.parts = [ 0, 0, 0, 0, 0 ]
    
    if( value ) {
      if( Buffer.isBuffer( value ) ) {
        this.parse( value, offset )
      } else if( Array.isArray( value ) ) {
        this.parts = value.slice( offset + 0, offset + 5 )
      } else if( typeof value === 'string' ) {
        this.fromString( value, offset )
      } else {
        throw new Error( `Invalid value "${ value + '' }"` )
      }
    }
    
  }
  
  parse( buffer, offset ) {
    
    offset = offset || 0
    
    this.parts[0] = buffer.readUInt32BE( offset + 0 )
    this.parts[1] = buffer.readUInt16BE( offset + 4 )
    this.parts[2] = buffer.readUInt16BE( offset + 6 )
    this.parts[3] = buffer.readUInt16LE( offset + 8 )
    this.parts[4] = buffer.readUIntBE( offset + 10, 6 )
    
    return this
    
  }
  
  write( buffer, offset ) {
    
    offset = offset || 0
    buffer = buffer || Buffer.allocUnsafe( GUID.size + offset )
    
    buffer.writeUInt32BE( this.parts[0], offset + 0 )
    buffer.writeUInt16BE( this.parts[1], offset + 4 )
    buffer.writeUInt16BE( this.parts[2], offset + 6 )
    buffer.writeUInt16LE( this.parts[3], offset + 8 )
    buffer.writeUIntBE( this.parts[4], offset + 10, 6 )
    
    return buffer
    
  }
  
  fromString( value, offset ) {
    
    offset = offset || 0
    value = value.slice( offset, offset + 36 )
    
    var parts = value.trim().split( '-' )
    
    this.parts[0] = parseInt( parts[0], 16 )
    this.parts[1] = parseInt( parts[1], 16 )
    this.parts[2] = parseInt( parts[2], 16 )
    this.parts[3] = parseInt( parts[3], 16 )
    this.parts[4] = parseInt( parts[4], 16 )
    
    return this
    
  }
  
  toString() {
    return hex( this.parts[0], 8 ) + '-' +
      hex( this.parts[1], 4 ) + '-' +
      hex( this.parts[2], 4 ) + '-' +
      hex( this.parts[3], 4 ) + '-' +
      hex( this.parts[4], 12 )
  }
  
  [util.inspect.custom]() {
    return `${this.constructor.name} { ${this.toString()} }`
  }
  
}

GUID.size = 16

GUID.from = function( value, offset ) {
  return new GUID( value, offset )
}

GUID.parse = function( buffer, offset ) {
  return new GUID().parse( buffer, offset )
}

module.exports = GUID
