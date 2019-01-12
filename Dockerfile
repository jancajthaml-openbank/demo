# Copyright (c) 2017-2018, Jan Cajthaml <jan.cajthaml@gmail.com>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

FROM debian:stretch

ENV DEBIAN_FRONTEND=noninteractive \
    LANG=C.UTF-8

RUN \
    apt-get -y update && \
    apt-get -y install \
      apt-utils \
      openssl \
      lsb-release \
      curl \
      git \
      cron \
      at \
      gnupg \
      logrotate \
      rsyslog \
      unattended-upgrades \
      ssmtp \
      lsof \
      procps \
      initscripts \
      libsystemd0 \
      libudev1 \
      systemd \
      haproxy \
      nginx \
      sysvinit-utils \
      udev \
      util-linux && \
    \
    curl -sL https://deb.nodesource.com/setup_10.x | bash && \
    \
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4 && \
    echo "deb http://repo.mongodb.org/apt/debian stretch/mongodb-org/4.0 main" | \
      tee /etc/apt/sources.list.d/mongodb-org-4.0.list && \
    \
    (\
      ls /lib/systemd/system/sysinit.target.wants | \
      grep -v systemd-tmpfiles-setup.service | \
      xargs rm -f \
    ) && \
    (rm -f /lib/systemd/system/sockets.target.wants/*udev*) && \
    systemctl mask -- \
      tmp.mount \
      etc-hostname.mount \
      etc-hosts.mount \
      etc-resolv.conf.mount \
      -.mount \
      swap.target \
      getty.target \
      getty-static.service \
      dev-mqueue.mount \
      cgproxy.service \
      systemd-tmpfiles-setup-dev.service \
      systemd-remount-fs.service \
      systemd-ask-password-wall.path \
      systemd-logind.service && \
    systemctl set-default multi-user.target ;:

ENV \
    LAKE_VERSION=1.1.3 \
    VAULT_VERSION=1.1.3 \
    WALL_VERSION=1.1.3 \
    SEARCH_VERSION=1.1.4 \
    FIO_BCO_VERSION=1.0.1

RUN \
    echo "downloading lake v${LAKE_VERSION}" && \
    curl --fail -L "https://github.com/jancajthaml-openbank/lake/releases/download/v${LAKE_VERSION}/lake_${LAKE_VERSION}_amd64.deb" -# \
    -o "/tmp/lake_${LAKE_VERSION}_amd64.deb" && \
    \
    echo "downloading vault v${VAULT_VERSION}" && \
    curl --fail -L "https://github.com/jancajthaml-openbank/vault/releases/download/v${VAULT_VERSION}/vault_${VAULT_VERSION}_amd64.deb" -# \
    -o "/tmp/vault_${VAULT_VERSION}_amd64.deb" && \
    \
    echo "downloading wall v${WALL_VERSION}" && \
    curl --fail -L "https://github.com/jancajthaml-openbank/wall/releases/download/v${WALL_VERSION}/wall_${WALL_VERSION}_amd64.deb" -# \
    -o "/tmp/wall_${WALL_VERSION}_amd64.deb" && \
    \
    echo "downloading search v${SEARCH_VERSION}" && \
    curl --fail -L "https://github.com/jancajthaml-openbank/search/releases/download/v${SEARCH_VERSION}/search_${SEARCH_VERSION}_all.deb" -# \
    -o "/tmp/search_${SEARCH_VERSION}_all.deb" && \
    \
    echo "downloading fio-bco v${FIO_BCO_VERSION}" && \
    curl --fail -L "https://github.com/jancajthaml-openbank/fio-bco/releases/download/v${FIO_BCO_VERSION}/fio-bco_${FIO_BCO_VERSION}_amd64.deb" -# \
    -o "/tmp/fio-bco_${FIO_BCO_VERSION}_amd64.deb" && \
    \
    find /tmp -name "*.deb" -exec file {} \;

RUN \
    apt-get -y update && \
    apt-get -y install -f /tmp/lake_${LAKE_VERSION}_amd64.deb && \
    apt-get -y install -f /tmp/vault_${VAULT_VERSION}_amd64.deb && \
    apt-get -y install -f /tmp/wall_${WALL_VERSION}_amd64.deb && \
    apt-get -y install -f /tmp/search_${SEARCH_VERSION}_all.deb && \
    apt-get -y install -f /tmp/fio-bco_${FIO_BCO_VERSION}_amd64.deb && \
    \
    systemctl enable \
      mongod \
      vault@demo \
      fio-bco@demo \
    && \
    \
    sed -ri /etc/systemd/journald.conf -e 's!^#?Storage=.*!Storage=volatile!' && \
    echo "root:Docker!" | chpasswd && \
    sed -i '/imklog/{s/^/#/}' /etc/rsyslog.conf && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /etc/nginx/ssl && \
    openssl req \
      -x509 \
      -nodes \
      -newkey rsa:2048 \
      -keyout "/etc/nginx/ssl/nginx.key" \
      -out "/etc/nginx/ssl/nginx.crt" \
      -days 365 \
      -subj "/C=CZ/ST=Czechia/L=Prague/O=OpenBanking/OU=IT/CN=localhost/emailAddress=jan.cajthaml@gmail.com" && \
    openssl dhparam \
      -in "/etc/nginx/ssl/nginx.crt" \
      -out "/etc/nginx/ssl/dhparam.pem" \
      2048

RUN mkdir /etc/systemd/system/nginx.service.d && \
    printf "[Service]\nExecStartPost=/bin/sleep 0.1\n" > /etc/systemd/system/nginx.service.d/override.conf

COPY etc/haproxy/haproxy.cfg /etc/haproxy/haproxy.cfg
COPY etc/nginx/nginx.cfg /etc/nginx/sites-available/default

STOPSIGNAL SIGTERM

VOLUME [ "/sys/fs/cgroup", "/run", "/run/lock", "/tmp" ]

ENTRYPOINT ["/lib/systemd/systemd"]
