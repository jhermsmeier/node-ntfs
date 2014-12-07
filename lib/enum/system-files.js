/**
 * System file's MFT record numbers (u32)
 * @type {Object}
 */
module.exports = {
  // Master file table (MFT): Data attribute
  // contains the entries and bitmap attribute
  // records which ones are in use (bit == 1)
  MFT: 0,
  // MFT mirror: copy of first four
  // MFT records in data attribute
  // If cluster size > 4kiB, copy of first N MFT records,
  // with N = cluster_size / mft_record_size
  MFT_MIRR: 1,
  // Journalling log in data attribute
  LOG_FILE: 2,
  // Volume name attribute and
  // volume information attribute
  // (flags and NTFS version)
  VOLUME: 3,
  // Array of attribute definitions
  // in data attribute
  ATTR_DEF: 4,
  // Root directory
  ROOT: 5,
  // Allocation bitmap of all
  // clusters (lcns) in data attribute
  BITMAP: 6,
  // Boot sector (always at cluster 0)
  // in data attribute
  BOOT: 7,
  // Contains all bad clusters in the
  // non-resident data attribute
  BAD_CLUSTER: 8,
  // Shared security descriptors in data attribute,
  // and two indexes into the descriptors.
  // Since Win 2k (before, file was called $Quota but never used)
  SECURE: 9,
  // Uppercase equivalents of all 65536 Unicode
  // characters in data attribute
  UP_CASE: 10,
  // Directory containing other system files
  // (i.e. $ObjId, $Quota, $Reparse and $UsnJrnl)
  // since NTFS 3.0
  EXTEND: 11,
  // Records 12-15: Reseved for future use
  // RESERVED12: 12,
  // RESERVED13: 13,
  // RESERVED14: 14,
  // RESERVED15: 15,
  // First user file, used as test limit
  // to determine whether to allow
  // opening a file or not
  FIRST_USER: 16,
}
