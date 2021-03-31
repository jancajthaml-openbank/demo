import urllib3
urllib3.disable_warnings()
import requests
from decimal import Decimal
import json


def get_all_tenants():
  yield "demo"


def get_all_transaction_ids(tenant):
  uri = "https://localhost/api/ledger/transaction/{}".format(tenant)
  r = requests.get(uri, stream=True, verify=False)
  for line in r.iter_lines():
    yield line.decode()


def get_transaction(tenant, transaction):
  uri = "https://localhost/api/ledger/transaction/{}/{}".format(tenant, transaction)
  r = requests.get(uri, stream=False, verify=False)
  return r.json()


def main():
  accounts = dict()
  for tenant in get_all_tenants():
    for transaction_id in get_all_transaction_ids(tenant):
      transaction = get_transaction(tenant, transaction_id)
      assert "status" in transaction, "missing attribute 'status' in {}".format(transaction)
      assert transaction["status"] == "committed", "non committed transaction {}".format(transaction)
      for transfer in transaction["transfers"]:
        credit = transfer["credit"]["name"]
        debit = transfer["debit"]["name"]
        if not credit in accounts:
          accounts[credit] = Decimal("0")
        if not debit in accounts:
          accounts[debit] = Decimal("0")

        accounts[credit] += Decimal(transfer["amount"])
        accounts[debit] -= Decimal(transfer["amount"])

        #print('{} -> {} amount {}'.format(debit, credit, Decimal(transfer["amount"])))

  normalized = dict()

  for account, balance in accounts.items():
    normalized[account] = str(balance)

  print(json.dumps(normalized, indent = 2, separators=(',', ': ')))


if __name__ == "__main__":
  main()
