/**
 * NTFS.ATTR_TYPES: System defined attributes (u32)
 *
 * Each attribute type has a corresponding attribute name
 * (Unicode string of maximum 64 character length) as described by
 * the attribute definitions present in the data attribute of
 * the $AttrDef system file
 * 
 * On NTFS 3.0 volumes the names are just as
 * the types are named in the below enum,
 * exchanging AT_ for the dollar sign ($)
 * 
 * @type {Object}
 */
module.exports = {
  UNUSED:                       0x00000000,
  STANDARD_INFORMATION:         0x00000010,
  ATTRIBUTE_LIST:               0x00000020,
  FILE_NAME:                    0x00000030,
  OBJECT_ID:                    0x00000040,
  SECURITY_DESCRIPTOR:          0x00000050,
  VOLUME_NAME:                  0x00000060,
  VOLUME_INFORMATION:           0x00000070,
  DATA:                         0x00000080,
  INDEX_ROOT:                   0x00000090,
  INDEX_ALLOCATION:             0x000000A0,
  BITMAP:                       0x000000B0,
  REPARSE_POINT:                0x000000C0,
  EA_INFORMATION:               0x000000D0,
  EA:                           0x000000E0,
  PROPERTY_SET:                 0x000000F0,
  LOGGED_UTILITY_STREAM:        0x00000100,
  FIRST_USER_DEFINED_ATTRIBUTE: 0x00001000,
  END:                          0xFFFFFFFF,
}
