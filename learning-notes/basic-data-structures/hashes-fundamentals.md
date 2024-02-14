# Hashes Fundamentals 

- A hash is a collection of key-value pairs
- Stored extremely efficiently
- Not recursive, only accept string values
- `HSET` creates and updates a hash
- `HGET` retrieves selected fields, `HGETALL` retrieves all fields
- `HDEL` deletes fields within hash
- `HINCRBY` increments a number stored a field
- Typical use cases:
  - Rate limiting
  - Session store

## Usage examples

### [`HSET`](https://redis.io/commands/hset/)

`HSET key field value [field value ...]`

- Sets the specified fields to their respective values in the hash stored at key

```bash
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HGET myhash field1
"Hello"
redis> HSET myhash field2 "Hi" field3 "World"
(integer) 2
redis> HGET myhash field2
"Hi"
redis> HGET myhash field3
"World"
redis> HGETALL myhash
1) "field1"
2) "Hello"
3) "field2"
4) "Hi"
5) "field3"
6) "World"
redis> 
```

## [`HDEL`](https://redis.io/commands/hdel/)

`HDEL key field [field ...]`

- Removes the specified fields from the hash stored at key. Specified fields that do not exist within this hash are ignored

```bash
redis> HSET myhash field1 "foo"
(integer) 1
redis> HDEL myhash field1
(integer) 1
redis> HDEL myhash field2
(integer) 0
redis> 
```

### [`HGET`](https://redis.io/commands/hget/)

`HGET key field`

- Returns the value associated with field in the hash stored at key.

```bash
redis> HSET myhash field1 "foo"
(integer) 1
redis> HGET myhash field1
"foo"
redis> HGET myhash field2
(nil)
redis> 
```

### [`HGETALL`](https://redis.io/commands/hgetall/)

`HGETALL key`

- Returns all fields and values of the hash stored at key

```bash
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "World"
(integer) 1
redis> HGETALL myhash
1) "field1"
2) "Hello"
3) "field2"
4) "World"
redis> 
```

## Hash Performance

- `O(1)` (regardless of the size of the hash): HGET, HSET, HINCRBY, HDEL
- `O(n)`: HGETALL, HSCAN


