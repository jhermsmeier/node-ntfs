/**
 * NTFS.COLLATION: Collation Rules // u32
 * @type {Object}
 */
module.exports = {
  // Collate by binary compare where
  // the first byte is most significant
  BINARY: 0x00000000,
  // Collate file names as Unicode strings
  FILE_NAME: 0x01000000,
  UNICODE_STRING: 0x02000000,
  // Collate Unicode strings by comparing their binary Unicode values,
  // except that when a character can be uppercased,
  // the upper case value collates before the lower case one.
  NTOFS_ULONG: 0x10000000,
  NTOFS_SID: 0x11000000,
  NTOFS_SECURITY_HASH: 0x12000000,
  NTOFS_ULONGS: 0x13000000,
}
