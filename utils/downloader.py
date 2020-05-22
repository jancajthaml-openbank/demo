#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
import ssl
try:
  _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
  pass
else:
  ssl._create_default_https_context = _create_unverified_https_context
import docker
import tarfile
import tempfile
import os
import sys
import json
from pathlib import Path

class Downloader(object):

  def __init__(self):
    self.http = urllib3.PoolManager()
    self.docker = docker.APIClient(base_url='unix://var/run/docker.sock')

  def get_latest_version(self, service):
    headers = {
      'User-Agent': 'https://api.github.com/meta'
    }
    if 'GITHUB_RELEASE_TOKEN' in os.environ:
      headers['Authorization'] = 'token {0}'.format(os.environ['GITHUB_RELEASE_TOKEN'])
    uri = 'https://api.github.com/repos/jancajthaml-openbank/{0}/releases/latest'.format(service)
    r = self.http.request('GET', uri, headers=headers)
    data = r.data.decode('utf-8')
    if r.status != 200:
      raise Exception('GitHUB version fetch failure {0}'.format(data))
    version = json.loads(data)['tag_name']
    if version.startswith('v'):
      version = version[len('v'):]
    return version

  def download_for_arch(self, service, arch, version, output_file):
    file_path = Path(output_file)
    dockerfile = ['FROM scratch']
    if self.http.request('GET', 'https://index.docker.io/v1/repositories/openbank/{0}/tags/v{1}-master'.format(service, version)).status == 200:
      image = 'openbank/{0}:v{1}-master'.format(service, version)
      package = '{0}_{1}+master_{2}'.format(service, version, arch)
    else:
      image = 'openbank/{0}:v{1}'.format(service, version)
      package = '{0}_{1}_{2}'.format(service, version, arch)
    try:
      self.docker.remove_image(image, force=True)
    except:
      pass
    finally:
      dockerfile.append('COPY --from={0} /opt/artifacts/{1}.deb /opt/artifacts/{2}'.format(image, package, file_path.name))
    temp = tempfile.NamedTemporaryFile(delete=True)
    try:
      with open(temp.name, 'w') as f:
        for item in dockerfile:
          f.write("%s\n" % item)
      for chunk in self.docker.build(fileobj=temp, rm=True, decode=True, tag='downloader-scratch'):
        if 'stream' in chunk:
          for line in chunk['stream'].splitlines():
            if len(line):
              sys.stdout.write('\033[K{0}\033[K\r\033[0m'.format('downloading {0}'.format(line.strip('\r\n')).rstrip()))
              sys.stdout.flush()
      scratch = self.docker.create_container('downloader-scratch', '/bin/true')
      if scratch['Warnings']:
        raise Exception(scratch['Warnings'])
      tar_stream, stat = self.docker.get_archive(scratch['Id'], '/opt/artifacts/{0}'.format(file_path.name))
      with open(file_path.name+'.tar', 'wb') as destination:
        total_bytes = 0
        for chunk in tar_stream:
          total_bytes += len(chunk)
          sys.stdout.write('\033[K{0}\033[K\r\033[0m'.format('exctracting {0} {1:.2f}%'.format(stat['name'], min(100, 100 * (total_bytes/stat['size']))).rstrip()))
          sys.stdout.flush()
          destination.write(chunk)
      archive = tarfile.TarFile(file_path.name+'.tar')
      archive.extract(file_path.name, str(file_path.parent))
      os.remove(file_path.name+'.tar')
      self.docker.remove_container(scratch['Id'])
      sys.stdout.write('\033[K{0}\033[K\033[0m'.format('{0}'.format(stat['name']).rstrip()))
    finally:
      temp.close()
      self.docker.remove_image('downloader-scratch', force=True)
      sys.stdout.write('\n')
      sys.stdout.flush()
