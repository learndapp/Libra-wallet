# Libra-wallet
Fackbook Libra blockchain wallet

## How to run

**1.Libra**

run
```
  cargo run -p libra_swarm -- -s
```
or
```
  ./scripts/cli/start_cli_testnet.sh
```

**2.node**

Change the package.json scripts start, from `ADDR` value `localhost:55383` to your local validator address.

then
```
  cd node
  npm i
  npm run start
```
or
```
  cd node
  npm i
  npm run start-testnet
```
default runing port is 17000

**3.api demo**
```
http://localhost:17000/api/account/state/be14f4294dba063c447623f0ed80d6b98166321b3f03f9f571c6526380917c4d

http://localhost:17000/api/account/transaction/be14f4294dba063c447623f0ed80d6b98166321b3f03f9f571c6526380917c4d/0/true

http://localhost:17000/api/events/be14f4294dba063c447623f0ed80d6b98166321b3f03f9f571c6526380917c4d/0/true/10

http://localhost:17000/api/transactions/0/10/true

http://localhost:17000/api/transactions/0/10/true?scope=txn_list_with_proof.transactions[0].raw_txn
```

**4.frontend**
```
  cd frontend
  npm i
  npm run dev
```

## License
MIT
