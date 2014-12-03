/**
 * NTFS.LOGLEVEL: Logging levels
 * @type {Object}
 */
module.exports = {
  DEBUG:    (1 <<  0), // x = 42
  TRACE:    (1 <<  1), // Entering function x()
  QUIET:    (1 <<  2), // Quietable output
  INFO:     (1 <<  3), // Volume needs defragmenting
  VERBOSE:  (1 <<  4), // Forced to continue
  PROGRESS: (1 <<  5), // 54% complete
  WARNING:  (1 <<  6), // You should backup before starting
  ERROR:    (1 <<  7), // Operation failed, no damage done
  PERROR:   (1 <<  8), // Message: standard error description
  CRITICAL: (1 <<  9), // Operation failed, damage may have occurred
  ENTER:    (1 << 10), // Enter a function
  LEAVE:    (1 << 11), // Leave a function 
}
