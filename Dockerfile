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

MAINTAINER Jan Cajthaml <jan.cajthaml@gmail.com>

ENV DEBIAN_FRONTEND=noninteractive \
    LANG=C.UTF-8 \
    LAKE_VERSION=1.0.1

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
      apt-utils \
      apt-transport-https \
      rsyslog \
      libsystemd0 \
      systemd \
      curl \
      ca-certificates \
      libzmq5=4.2.1-4

RUN sed -i '/imklog/{s/^/#/}' /etc/rsyslog.conf

COPY etc/sysctl.conf /etc/sysctl.conf
COPY etc/security/limits.conf /etc/security/limits.conf

RUN mkdir -p /etc/init

RUN echo "root:Docker!" | chpasswd

# lake bootstrap

RUN \
    echo "LAKE_LOG_LEVEL=INFO" > /etc/init/lake.conf && \
    echo "LAKE_PORT_PULL=5562" >> /etc/init/lake.conf && \
    echo "LAKE_PORT_PUB=5561" >> /etc/init/lake.conf && \
    echo "LAKE_METRICS_REFRESHRATE=1s" >> /etc/init/lake.conf && \
    echo "LAKE_METRICS_OUTPUT=/opt/lake/metrics/metrics.json" >> /etc/init/lake.conf && \
    \
    mkdir -p /opt/lake/metrics

RUN curl -L "https://github.com/jancajthaml-openbank/lake/releases/download/v${LAKE_VERSION}/lake_${LAKE_VERSION}_amd64.deb" \
    -# \
    -o "/var/cache/apt/archives/lake_${LAKE_VERSION}_amd64.deb" && \
    apt-get -y install --no-install-recommends \
    -f "/var/cache/apt/archives/lake_${LAKE_VERSION}_amd64.deb"

# cnb-rates bootstrap

STOPSIGNAL SIGTERM
