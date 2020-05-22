from downloader import Downloader

downloader = Downloader()

# arch specific
for service in ['lake', 'vault', 'ledger', 'fio-bco', 'bondster-bco']:
  version = downloader.get_latest_version(service)
  downloader.download_for_arch(service, 'amd64', version, '/tmp/debs/{}.deb'.format(service))

# universal
for service in ['search']:
  version = downloader.get_latest_version(service)
  downloader.download_for_arch(service, 'all', version, '/tmp/debs/{}.deb'.format(service))
