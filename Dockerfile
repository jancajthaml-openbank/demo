# Copyright (c) 2017-2020, Jan Cajthaml <jan.cajthaml@gmail.com>
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

ARG LAKE_VERSION
ARG VAULT_VERSION
ARG LEDGER_VERSION
ARG FIO_BCO_VERSION
ARG BONDSTER_BCO_VERSION
ARG DWH_VERSION

FROM openbank/lake:v${LAKE_VERSION}-master as lake-artifacts
FROM openbank/vault:v${VAULT_VERSION}-master as vault-artifacts
FROM openbank/ledger:v${LEDGER_VERSION}-master as ledger-artifacts
FROM openbank/fio-bco:v${FIO_BCO_VERSION}-master as fio-bco-artifacts
FROM openbank/bondster-bco:v${BONDSTER_BCO_VERSION}-master as bondster-bco-artifacts
FROM openbank/data-warehouse:v${DWH_VERSION}-master as data-warehouse-artifacts

FROM debian:buster

ARG LAKE_VERSION
ARG VAULT_VERSION
ARG LEDGER_VERSION
ARG FIO_BCO_VERSION
ARG BONDSTER_BCO_VERSION
ARG DWH_VERSION

ENV DEBIAN_FRONTEND=noninteractive \
    LANG=C.UTF-8

RUN \
  apt-get update -y && \
  \
  apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    git \
    tar \
    cron \
    bzip2 \
    nginx \
    apt-utils \
    dpkg-dev \
    netcat-openbsd \
    rsyslog \
    libzmq5>=4.2.1~ \
    openjdk-11-jre \
    systemd \
    systemd-sysv \
    dbus \
    dbus-user-session \
  && \
  apt-get clean -y \
  && \
  rm -rf \
    /var/lib/apt/lists/* \
    /var/log/alternatives.log \
    /var/log/apt/history.log \
    /var/log/apt/term.log \
    /var/log/dpkg.log \
  :

RUN \
    sed -i '/imklog/{s/^/#/}' /etc/rsyslog.conf && \
    sed -ri /etc/systemd/journald.conf -e 's!^#?Storage=.*!Storage=volatile!'

RUN systemctl mask -- \
      dev-hugepages.mount \
      sys-fs-fuse-connections.mount \
      systemd-tmpfiles-setup-dev.service \
      systemd-firstboot.service \
      systemd-udevd.service \
      systemd-resolved.service \
      systemd-ask-password-wall.path \
      systemd-logind.service && \
    :

RUN rm -f \
      /etc/machine-id \
      /var/lib/dbus/machine-id && \
    :

RUN mkdir -p /tmp/artifacts /tmp/debs

COPY --from=lake-artifacts /opt/artifacts/* /tmp/artifacts/lake/
RUN cp /tmp/artifacts/lake/lake_${LAKE_VERSION}+master_amd64.deb /tmp/debs/lake_${LAKE_VERSION}_amd64.deb

COPY --from=vault-artifacts /opt/artifacts/* /tmp/artifacts/vault/
RUN cp /tmp/artifacts/vault/vault_${VAULT_VERSION}+master_amd64.deb /tmp/debs/vault_${VAULT_VERSION}_amd64.deb

COPY --from=ledger-artifacts /opt/artifacts/* /tmp/artifacts/ledger/
RUN cp /tmp/artifacts/ledger/ledger_${LEDGER_VERSION}+master_amd64.deb /tmp/debs/ledger_${LEDGER_VERSION}_amd64.deb

COPY --from=fio-bco-artifacts /opt/artifacts/* /tmp/artifacts/fio-bco/
RUN cp /tmp/artifacts/fio-bco/fio-bco_${FIO_BCO_VERSION}+master_amd64.deb /tmp/debs/fio-bco_${FIO_BCO_VERSION}_amd64.deb

COPY --from=bondster-bco-artifacts /opt/artifacts/* /tmp/artifacts/bondster-bco/
RUN cp /tmp/artifacts/bondster-bco/bondster-bco_${BONDSTER_BCO_VERSION}+master_amd64.deb /tmp/debs/bondster-bco_${BONDSTER_BCO_VERSION}_amd64.deb

COPY --from=data-warehouse-artifacts /opt/artifacts/* /tmp/artifacts/data-warehouse/
RUN cp /tmp/artifacts/data-warehouse/data-warehouse_${DWH_VERSION}+master_amd64.deb /tmp/debs/data-warehouse_${DWH_VERSION}_amd64.deb

RUN mkdir /etc/systemd/system/nginx.service.d && \
    printf "[Service]\nExecStartPost=/bin/sleep 0.1\n" > /etc/systemd/system/nginx.service.d/override.conf

RUN \
    apt-get -y update && \
    apt-get -y install -f /tmp/debs/lake_${LAKE_VERSION}_amd64.deb && \
    apt-get -y install -f /tmp/debs/vault_${VAULT_VERSION}_amd64.deb && \
    apt-get -y install -f /tmp/debs/ledger_${LEDGER_VERSION}_amd64.deb && \
    apt-get -y install -f /tmp/debs/fio-bco_${FIO_BCO_VERSION}_amd64.deb && \
    apt-get -y install -f /tmp/debs/bondster-bco_${BONDSTER_BCO_VERSION}_amd64.deb && \
    apt-get -y install -f /tmp/debs/data-warehouse_${DWH_VERSION}_amd64.deb && \
    \
    rm -rf /tmp/debs \
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
    sed -ri /etc/init/data-warehouse.conf -e \
      's!^DWH_POSTGRES_URL=.*!DWH_POSTGRES_URL=jdbc:postgresql://postgres:5432/openbank!' && \
    :

COPY etc/nginx/nginx.cfg /etc/nginx/sites-available/default

RUN \
  systemctl enable \
    vault-unit@demo \
    ledger-unit@demo \
    bondster-bco-import@demo \
    fio-bco-import@demo \
  ;

STOPSIGNAL SIGTERM

VOLUME [ "/sys/fs/cgroup", "/run", "/run/lock", "/tmp" ]

ENTRYPOINT [ "/lib/systemd/systemd" ]
