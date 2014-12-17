/**
 * Magic identifiers (u32) present at the beginning
 * of all NTFS records containing records
 * (like MFT records for example)
 * @type {Object}
 */
module.exports = {
  // Found in all NTFS records
  BAD:      0x42414144, // Failed multi-sector transfer
  // Found in $MFT/$DATA
  FILE:     0x46494C45, // MFT entry
  INDEX:    0x494E4458, // Index buffer
  HOLE:     0x484F4C45, // NTFS 3.0+ ???
  // Found in $LogFile/$DATA
  RESTART:  0x52535452, // Restart page
  RECORD:   0x52435244, // Log record page
  CHKD:     0x43484B44, // Modified by CHKDSK
  EMPTY:    0xFFFFFFFF, // Record empty, init before use
}
