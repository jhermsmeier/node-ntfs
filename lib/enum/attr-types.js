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
  STANDARD_INFORMATION:         0x00100000,
  ATTRIBUTE_LIST:               0x00200000,
  FILE_NAME:                    0x00300000,
  OBJECT_ID:                    0x00400000,
  SECURITY_DESCRIPTOR:          0x00500000,
  VOLUME_NAME:                  0x00600000,
  VOLUME_INFORMATION:           0x00700000,
  DATA:                         0x00800000,
  INDEX_ROOT:                   0x00900000,
  INDEX_ALLOCATION:             0x00A00000,
  BITMAP:                       0x00B00000,
  REPARSE_POINT:                0x00C00000,
  EA_INFORMATION:               0x00D00000,
  EA:                           0x00E00000,
  PROPERTY_SET:                 0x00F00000,
  LOGGED_UTILITY_STREAM:        0x01000000,
  FIRST_USER_DEFINED_ATTRIBUTE: 0x10000000,
  END:                          0xFFFFFFFF,
}
