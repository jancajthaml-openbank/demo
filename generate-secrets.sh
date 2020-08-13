#!/bin/bash

set -eu
trap exit INT TERM

root_dir=/openbank/secrets

mkdir -p "${root_dir}"

################################################################################

# fs encryption key
printf "ced284867c66d6a2a8bd4272ef79b73e88285f3b1ad29fffe525f21b115932f7" > "${root_dir}/fs_encryption.key"

# cert chain
openssl \
  genrsa \
  -des3 \
  -passout \
  pass:demo \
  -out "${root_dir}/ca.key" \
  2048

openssl \
  req \
  -x509 \
  -new \
  -nodes \
  -passin pass:demo \
  -key "${root_dir}/ca.key" \
  -sha256 \
  -days 1825 \
  -out "${root_dir}/ca.crt" \
  -subj /CN=openbank.ca

cp "${root_dir}/ca.crt" /usr/local/share/ca-certificates/ca.crt

openssl \
  genrsa \
  -out "${root_dir}/domain.local.key" \
  2048

openssl \
  req \
  -new \
  -sha256 \
  -key "${root_dir}/domain.local.key" \
  -subj /CN=localhost \
  -out "${root_dir}/domain.local.csr"

openssl \
  x509 \
  -req \
  -passin pass:demo \
  -extfile <(printf "[v3_ca]\nsubjectAltName = DNS:localhost,IP:127.0.0.1\n[v3_req]\nextendedKeyUsage=serverAuth\nsubjectAltName = DNS:localhost,IP:127.0.0.1") \
  -extensions v3_req \
  -extensions v3_ca \
  -in "${root_dir}/domain.local.csr" \
  -CA "${root_dir}/ca.crt" \
  -CAkey "${root_dir}/ca.key" \
  -CAcreateserial \
  -out "${root_dir}/domain.local.crt" \
  -days 500 \
  -sha256

openssl \
  x509 \
  -in "${root_dir}/domain.local.crt" \
  -text \
  -noout

update-ca-certificates
