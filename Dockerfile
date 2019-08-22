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
      sysvinit-utils \
      udev \
      util-linux \
      \
      libzmq5>=4.2.1~ \
      && \
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
    systemctl set-default multi-user.target ;

ARG LAKE_VERSION
ARG VAULT_VERSION
ARG LEDGER_VERSION
ARG FIO_BCO_VERSION
ARG BONDSTER_BCO_VERSION
ARG SEARCH_VERSION

RUN \
    echo "downloading lake@${LAKE_VERSION}" && \
    curl --fail -L "https://github.com/jancajthaml-openbank/lake/releases/download/v${LAKE_VERSION}/lake_${LAKE_VERSION}_amd64.deb" -# \
    -o "/tmp/lake_${LAKE_VERSION}_amd64.deb" && \
    \
    echo "downloading vault@${VAULT_VERSION}" && \
    curl --fail -L "https://github.com/jancajthaml-openbank/vault/releases/download/v${VAULT_VERSION}/vault_${VAULT_VERSION}_amd64.deb" -# \
    -o "/tmp/vault_${VAULT_VERSION}_amd64.deb" && \
    \
    echo "downloading ledger@${LEDGER_VERSION}" && \
    curl --fail -L "https://github.com/jancajthaml-openbank/ledger/releases/download/v${LEDGER_VERSION}/ledger_${LEDGER_VERSION}_amd64.deb" -# \
    -o "/tmp/ledger_${LEDGER_VERSION}_amd64.deb" && \
    \
    echo "downloading search@${SEARCH_VERSION}" && \
    curl --fail -L "https://github.com/jancajthaml-openbank/search/releases/download/v${SEARCH_VERSION}/search_${SEARCH_VERSION}_amd64.deb" -# \
    -o "/tmp/search_${SEARCH_VERSION}_all.deb" && \
    \
    echo "downloading fio-bco@${FIO_BCO_VERSION}" && \
    curl --fail -L "https://github.com/jancajthaml-openbank/fio-bco/releases/download/v${FIO_BCO_VERSION}/fio-bco_${FIO_BCO_VERSION}_amd64.deb" -# \
    -o "/tmp/fio-bco_${FIO_BCO_VERSION}_amd64.deb" && \
    \
    echo "downloading bondster-bco@${BONDSTER_BCO_VERSION}" && \
    curl --fail -L "https://github.com/jancajthaml-openbank/bondster-bco/releases/download/v${BONDSTER_BCO_VERSION}/bondster-bco_${BONDSTER_BCO_VERSION}_amd64.deb" -# \
    -o "/tmp/bondster-bco_${BONDSTER_BCO_VERSION}_amd64.deb" && \
    \
    ls -la /tmp && \
    find /tmp -name "*.deb" -exec file {} \;

RUN \
    apt-get -y update && \
    apt-get -y install -f /tmp/lake_${LAKE_VERSION}_amd64.deb && \
    apt-get -y install -f /tmp/vault_${VAULT_VERSION}_amd64.deb && \
    apt-get -y install -f /tmp/ledger_${LEDGER_VERSION}_amd64.deb && \
    apt-get -y install -f /tmp/search_${SEARCH_VERSION}_all.deb && \
    apt-get -y install -f /tmp/fio-bco_${FIO_BCO_VERSION}_amd64.deb && \
    apt-get -y install -f /tmp/bondster-bco_${BONDSTER_BCO_VERSION}_amd64.deb && \
    \
    systemctl enable mongod \
    && \
    \
    sed -ri /etc/systemd/journald.conf -e 's!^#?Storage=.*!Storage=volatile!' && \
    echo "root:Docker!" | chpasswd && \
    sed -i '/imklog/{s/^/#/}' /etc/rsyslog.conf && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

RUN rm -rf \
      /opt/vault/secrets \
      /opt/ledger/secrets \
      /opt/fio-bco/secrets \
      /opt/bondster-bco/secrets && \
    \
    sed -ri /etc/init/fio-bco.conf -e \
      's!^FIO_BCO_SECRETS=.*!FIO_BCO_SECRETS=/openbank/secrets!' && \
    sed -ri /etc/init/fio-bco.conf -e \
      's!^FIO_BCO_LOG_LEVEL=.*!FIO_BCO_LOG_LEVEL=DEBUG!' && \
    sed -ri /etc/init/bondster-bco.conf -e \
      's!^BONDSTER_BCO_SECRETS=.*!BONDSTER_BCO_SECRETS=/openbank/secrets!' && \
    sed -ri /etc/init/bondster-bco.conf -e \
      's!^BONDSTER_BCO_LOG_LEVEL=.*!BONDSTER_BCO_LOG_LEVEL=DEBUG!' && \
    sed -ri /etc/init/vault.conf -e \
      's!^VAULT_SECRETS=.*!VAULT_SECRETS=/openbank/secrets!' && \
    sed -ri /etc/init/vault.conf -e \
      's!^VAULT_LOG_LEVEL=.*!VAULT_LOG_LEVEL=DEBUG!' && \
    sed -ri /etc/init/ledger.conf -e \
      's!^LEDGER_SECRETS=.*!LEDGER_SECRETS=/openbank/secrets!' &&\
    sed -ri /etc/init/ledger.conf -e \
      's!^LEDGER_LOG_LEVEL=.*!LEDGER_LOG_LEVEL=DEBUG!' && \
    sed -ri /etc/init/bondster-bco.conf -e \
      's!^BONDSTER_BCO_ENCRYPTION_KEY=.*!BONDSTER_BCO_ENCRYPTION_KEY=/openbank/secrets/fs_encryption.key!' && \
    sed -ri /etc/init/fio-bco.conf -e \
      's!^FIO_BCO_ENCRYPTION_KEY=.*!FIO_BCO_ENCRYPTION_KEY=/openbank/secrets/fs_encryption.key!' && \
    :

RUN systemctl enable \
      vault-unit@demo \
      ledger-unit@demo \
      vault-unit@test \
      ledger-unit@test \
      bondster-bco-import@demo \
      fio-bco-import@demo \
    ;

STOPSIGNAL SIGTERM

VOLUME [ "/sys/fs/cgroup", "/run", "/run/lock", "/tmp" ]

ENTRYPOINT ["/lib/systemd/systemd"]
