/**
 * NTFS.COLLATION: Collation Rules // u32
 * @type {Object}
 */
module.exports = {
  // Collate by binary compare where
  // the first byte is most significant
  BINARY: 0x00000000,
  // Collate file names as Unicode strings
  FILE_NAME: 0x00000001,
  UNICODE_STRING: 0x00000002,
  // Collate Unicode strings by comparing their binary Unicode values,
  // except that when a character can be uppercased,
  // the upper case value collates before the lower case one.
  NTOFS_ULONG: 0x00000010,
  NTOFS_SID: 0x00000011,
  NTOFS_SECURITY_HASH: 0x00000012,
  NTOFS_ULONGS: 0x00000013,
}
