# Keys Expiration

- Expiration times can be set - abbreviated as TTL
- Can be set in milliseconds, seconds or Unix timestamp
- Expiration can be removed 

## TTL Commands 

### Set:
- [`EXPIRE`](https://redis.io/commands/expire/): Set a timeout on key. After the timeout has expired, the key will automatically be deleted
- [`EXPIREAT`](https://redis.io/commands/expireat): `EXPIREAT` has the same effect and semantic as EXPIRE, but instead of specifying the number of seconds representing the TTL (time to live), it takes an absolute Unix timestamp (seconds since January 1, 1970)
- [`PEXPIRE`](https://redis.io/commands/pexpire/): Works exactly like `EXPIRE` but the time to live of the key is specified in milliseconds instead of seconds
- [`PEXPIREAT`](https://redis.io/commands/pexpireat/): Has the same effect and semantic as `EXPIREAT`, but the Unix time at which the key will expire is specified in milliseconds instead of seconds

### Examine:
- [`TTL`](https://redis.io/commands/ttl/): Returns the remaining time to live of a key that has a timeout. This introspection capability allows a Redis client to check how many seconds a given key will continue to be part of the dataset

```bash
redis> SET mykey "Hello"
"OK"
redis> EXPIRE mykey 10
(integer) 1
redis> TTL mykey
(integer) 10
redis> 
```

- [`PTTL`](https://redis.io/commands/pttl/): Like TTL this command returns the remaining time to live of a key that has an expire set, with the sole difference that TTL returns the amount of remaining time in seconds while PTTL returns it in milliseconds

```bash
redis> SET mykey "Hello"
"OK"
redis> EXPIRE mykey 1
(integer) 1
redis> PTTL mykey
(integer) 1000
redis> 
```

### Remove:
- [`PERSIST`](https://redis.io/commands/persist/): Remove the existing timeout on key, turning the key from volatile (a key with an expire set) to persistent (a key that will never expire as no timeout is associated)

```bash 
redis> SET mykey "Hello"
"OK"
redis> EXPIRE mykey 10
(integer) 1
redis> TTL mykey
(integer) 10
redis> PERSIST mykey
(integer) 1
redis> TTL mykey
(integer) -1
redis> 
```

## On a `SET` command with `PX` OR `EX` parameter

```bash
# Milliseconds
set seat-hold Row:A:Seat:4 PX 50000

# Seconds
set seat-hold Row:A:Seat:4 EX 50
```


