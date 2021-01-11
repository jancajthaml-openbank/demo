import urllib3
urllib3.disable_warnings()
import requests
import json


def get_all_tenants():
  yield 'demo'


def get_all_transaction_ids(tenant):
  uri = 'https://localhost/api/ledger/transaction/{}'.format(tenant)
  r = requests.get(uri, stream=True, verify=False)
  for line in r.iter_lines():
    yield line.decode()


def get_transaction(tenant, transaction):
  uri = 'https://localhost/api/ledger/transaction/{}/{}'.format(tenant, transaction)
  r = requests.get(uri, stream=False, verify=False)
  return r.json()


def main():
  for tenant in get_all_tenants():
    for transaction_id in get_all_transaction_ids(tenant):
      transaction = get_transaction(tenant, transaction_id)
      print(json.dumps(transaction, indent = 2, separators=(',', ': ')))


if __name__ == "__main__":
  main()
