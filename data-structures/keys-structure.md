# Redis Keys 

## Characteristics 

- Unique 
- Binary safe 
  - Example: "Foo", 42, 3.1415, 0xff
- Key names can be up to 512MB
- Tradeoff: Length versus Readability

## Key Spaces

- Logical Databases
- Flat key space 
- No automatic namespacing 
- Important for developers to think about naming conversions 

## Logical Databases

A logical database in the context of Redis refers to a separate namespace within a single Redis instance. 

Redis supports multiple logical databases, and they are identified by numeric indexes starting from 0.

- Database Zero -> The initial database that is selected when a Redis connection is established, unless specified otherwise
- Key spaces within a database
- Why not use Databases?

## Key Example 

Import to have a consistent conversion throughout the codebase to avoid clashes. 

- `user:id:followers`
  - `user:1000:followers`
    - user: object name
    - 1000: unique identifier
    - followers: composed object

Keys are case sensitive due to binary comparison, example:
- `registeredusers:1000:followers`
- `RegisteredUsers:1000:followers`
- `registeredUsers:1000:followers`

## With Redis commands:

### Creating and getting the value of a key 

- https://redis.io/commands/set/
- https://redis.io/commands/get/

`SET key value [EX seconds] [PX milliseconds] [NX|XX]`

`GET ket`

```bash
SET customer:1000 fred 

GET customer:1000
```

### Getting a list of existing key names

1. [`KEYS`](https://redis.io/commands/keys/)

- Blocks until completion: Not recommended since it might lock the database for a long time depending on the amount of keys stored
- Never a good idea to run in production
- Useful for debugging

2. [`SCAN`](https://redis.io/commands/scan/)

`SCAN slot [MATCH pattern] [COUNT count]`

- Itinerate using a cursor 
- Returns a slot reference 
- May return 0 or more keys per call 
- Safe for production 

Examples:

Debugging locally:
```bash
keys customer:1*
```

Production scenario:
```bash
# Might return a new slot ID to plug into a new call
SCAN 0 MATCH customer:1*

# To look for more keys per call, a count can be passed - note this can have a negative performance, block the database in a long period of time 
SCAN 1229 MATCH customer:1* COUNT 100

# Returns a cursor value of 0 when there's no more keys to itinerate over
```

### Removal of keys

1. [`DEL`](https://redis.io/commands/del)

`DEL key [key...]`

- O(N) where N is the number of keys that will be removed. 
- Removing a single key that holds a string value is O(1)
- Blocking operation
- Removes the key and it's associated memory

2. [`UNLINK`](https://redis.io/commands/unlink)

`UNLINK key [key...]`

- O(1) for each key removed regardless of its size
- the command performs the actual memory reclaiming in a different thread, so it is not blocking, while `DEL` is. 
- The actual removal will happen later asynchronously.

```bash
unlink customer:1000
```

### Verify if a key exists

1. [`EXISTS`](https://redis.io/commands/exists)

`EXISTS key [key ...]`

- O(N) where N is the number of keys to check.
- Returns if `key` exists.

```bash
redis> SET key1 "Hello"
"OK"
redis> EXISTS key1
(integer) 1
redis> EXISTS nosuchkey
(integer) 0
redis> SET key2 "World"
"OK"
redis> EXISTS key1 key2 nosuchkey
(integer) 2
redis> 
```

However, having two operations, an `EXISTS` followed by a `SET` means to round trips to Redis, and possible inconsistencies between the operations. Another connection may set a value of remove the key in between those two commands.

The `SET` command provides additional commands that allow to check for the non-existence with `NX` and existence with `XX`.

`SET key value [EX seconds] [PX milliseconds] [NX|XX]`

```bash
redis> SET anotherkey "will expire in a minute" EX 60
"OK"
redis> set inventory:100-meters-womans-final 1000 NX 
OK
redis> set inventory:100-meters-womans-final "Sold out" NX
(NIL) # Key already exists, therefore the value remains unchanged
redis> set inventory:100-meters-womans-final 0 XX
OK # Only set if the key exists
```
