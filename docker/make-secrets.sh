#!/bin/bash

passphrase=$(openssl rand -base64 32)

if [ -d secrets ] ; then
      rm -rf secrets
fi
mkdir -p secrets

fs_key_generate() {
      openssl rand -hex 32 | xargs echo -n > "secrets/fs.key"
}

ca_generate () {
      openssl \
            genrsa \
            -des3 \
            -passout pass:${passphrase} \
            -out "secrets/openbank-ca.key" \
            2048

      openssl \
            req \
            -x509 \
            -new \
            -nodes \
            -passin pass:${passphrase} \
            -key "secrets/openbank-ca.key" \
            -sha256 \
            -days 1825 \
            -out "secrets/openbank-ca.crt" \
            -subj /CN=localhost.ca
}

ssl_generate () {
      local name="$1"
      if [ -z $name ] ; then
            return
      fi

      temp_conf=$(mktemp)
      printf "[v3_ca]\n" >> ${temp_conf}
      printf "subjectAltName = DNS:%s,IP:127.0.0.1\n" ${name} >> ${temp_conf}
      printf "[v3_req]\n" >> ${temp_conf}
      printf "extendedKeyUsage=serverAuth\n" >> ${temp_conf}
      printf "subjectAltName = DNS:%s,IP:127.0.0.1" ${name} >> ${temp_conf}

      # key
      openssl \
            genrsa \
            -out "secrets/${name}.key" \
            2048

      # csr
      openssl req \
            -new \
            -sha256 \
            -key "secrets/${name}.key" \
            -subj /CN=${name} \
            -out "secrets/${name}.csr"

      # crt
      openssl x509 \
            -req \
            -passin pass:${passphrase} \
             -extfile ${temp_conf} \
             -extensions v3_req \
             -extensions v3_ca \
             -in "secrets/${name}.csr" \
             -CA "secrets/openbank-ca.crt" \
             -CAkey "secrets/openbank-ca.key" \
             -CAcreateserial \
             -out "secrets/${name}.crt" \
             -days 30 \
             -sha256

      rm -f "secrets/${name}.csr"
      rm -f ${temp_conf}
}

ca_generate
ssl_generate vault-rest
ssl_generate ledger-rest
ssl_generate fio-bco-rest
ssl_generate bondster-bco-rest

fs_key_generate
