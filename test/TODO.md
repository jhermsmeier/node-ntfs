# TODO

- [ ] Add Dependency CI (or David DM)
- [ ] Add unit tests
  - [ ] Add code coverage
  - [ ] Add code quality CI
- [ ] Use VHD or other virtual disk format for (integration?) testing
  - Create a fresh volume and pepper it with structures to test
    - Basic files
    - Files with alternate streams
    - Compressed files, sparse files (seperate test volume with NTFS compression enabled?)
    - Corrupted NTFS volume (chkdsk)
    - Different NTFS versions (a volume each, how to obtain?)
