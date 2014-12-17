var NTFS = module.exports

// NTFS magic (OEM_ID)
// 0x202020205346544E
NTFS.OEM_ID = 'NTFS    '

// NTFS Buffer Size
NTFS.BUFFER_SIZE = 8192
// NTFS' logical block size
NTFS.BLOCK_SIZE = 512
// ???
NTFS.BLOCK_SIZE_BITS = 9

// Maximum allowed length for a file name
NTFS.MAX_NAME_LEN = 255

// NTFS logging levels
NTFS.LOGLEVEL = require( './enum/log-levels' )
// System file's MFT record numbers
NTFS.SYSTEM_FILE = require( './enum/system-files' )
// Magic identifiers of NTFS records
NTFS.RECORD_TYPE = require( './enum/record-types' )
// Collation Rules
NTFS.COLLATION = require( './enum/collation-rules' )

/**
 * Flags for the ntfs_mount() function
 * @type {Object}
 */
NTFS.MOUNT = {
  NONE:             0x00000000,
  READONLY:         0x00000001,
  FORENSIC:         0x04000000,
  EXCLUSIVE:        0x08000000,
  RECOVER:          0x10000000,
  IGNORE_HIBERFILE: 0x20000000,
}

/**
 * Flags returned by the ntfs_check_if_mounted() function
 * @type {Object}
 */
NTFS.MOUNT_STATUS = {
  MOUNTED:  1, // Device is mounted
  ISROOT:   2, // Device is mounted as system root
  READONLY: 4, // Device is mounted read-only
}

// NTFS GUID
NTFS.GUID = require( './guid' )
// Volume Boot Record (512 bytes)
NTFS.VBR = require( './volume/boot-record' )
// NTFS Master File Table
NTFS.MFT = require( './mft' )
// NTFS Attribute
NTFS.Attribute = require( './attribute' )
// NTFS Volume
NTFS.Volume = require( './volume' )

/**
 * Determines if partition is NTFS formatted
 * @param  {Buffer} bootSector
 * @return {Boolean}
 */
NTFS.test = function( bootSector ) {
  // TODO: Determine through the first sector
  // of a partition, if the given volume is NTFS
}
