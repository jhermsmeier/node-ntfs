var assert = require( 'assert' )
var NTFS = require( '..' )
var inspect = require( './inspect' )

context( 'NTFS', function() {
  
  context( 'GUID', function() {
    
    specify( '.from()', function() {
      var value = '6B29FC40-CA47-1067-B31D-00DD010662DA'
      var guid = NTFS.GUID.from( value )
      inspect.log( guid.parts )
      inspect.log( guid )
      assert.strictEqual( guid.toString(), value )
    })
    
  })
  
})
