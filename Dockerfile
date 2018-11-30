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
    LANG=C.UTF-8 \
    \
    LAKE_VERSION=1.1.2 \
    VAULT_VERSION=1.1.2 \
    WALL_VERSION=1.1.2 \
    SEARCH_VERSION=1.1.2

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
    systemctl set-default multi-user.target ;: && \
    \
    curl -L "https://github.com/jancajthaml-openbank/lake/releases/download/v${LAKE_VERSION}/lake_${LAKE_VERSION}_amd64.deb" -# \
    -o "/tmp/lake_${LAKE_VERSION}_amd64.deb" && \
    \
    curl -L "https://github.com/jancajthaml-openbank/vault/releases/download/v${VAULT_VERSION}/vault_${VAULT_VERSION}_amd64.deb" -# \
    -o "/tmp/vault_${VAULT_VERSION}_amd64.deb" && \
    \
    curl -L "https://github.com/jancajthaml-openbank/wall/releases/download/v${WALL_VERSION}/wall_${WALL_VERSION}_amd64.deb" -# \
    -o "/tmp/wall_${WALL_VERSION}_amd64.deb" && \
    \
    curl -L "https://github.com/jancajthaml-openbank/search/releases/download/v${SEARCH_VERSION}/search_${SEARCH_VERSION}_all.deb" -# \
    -o "/tmp/search_${SEARCH_VERSION}_all.deb" && \
    \
    apt-get clean && rm -rf /var/lib/apt/lists/*

RUN \
    apt-get -y update && \
    apt-get -y install -f /tmp/lake_${LAKE_VERSION}_amd64.deb && \
    apt-get -y install -f /tmp/vault_${VAULT_VERSION}_amd64.deb && \
    apt-get -y install -f /tmp/wall_${WALL_VERSION}_amd64.deb && \
    apt-get -y install -f /tmp/search_${SEARCH_VERSION}_all.deb && \
    \
    systemctl enable \
      mongod \
      vault@demo \
    && \
    \
    sed -ri /etc/systemd/journald.conf -e 's!^#?Storage=.*!Storage=volatile!' && \
    echo "root:Docker!" | chpasswd && \
    sed -i '/imklog/{s/^/#/}' /etc/rsyslog.conf && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

COPY etc/haproxy/haproxy.cfg /etc/haproxy/haproxy.cfg

STOPSIGNAL SIGTERM

VOLUME [ "/sys/fs/cgroup", "/run", "/run/lock", "/tmp" ]

ENTRYPOINT ["/lib/systemd/systemd"]

