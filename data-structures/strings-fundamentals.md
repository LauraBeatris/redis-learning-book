# Strings Fundamentals

- Store strings, numerical values, serialized JSON and binary
- Store and manipulate numerical values 
- Commonly used for caching when combined with `EXPIRE`
- Maximum of 512MB

## Usage

- Caching
  - API responses
  - Session storage
  - HTML pages
- Counters
  - Built-in support for incrementing and decrementing integers and floating points

## Examples

### 1. How to store and retrieve a string

`SET <key> <value>`

```bash
redis> SET user:101:time-zone UTC-8
"OK"
redis> GET user:101:time-zone
"UTC-8"
```

### 2. Use case: storing JSON 

```bash
redis> SET usage:63 '{"balance":500}' EX 7200
"OK"
```

### 3. Increment and decrement 

#### Incrementing

```bash
# With a key that doesn't exist yet
redis> EXISTS user:23:visit-count
(integer) 0

redis> INCR user:23:visit-count
(integer) 1
```

```bash
redis> INCRBY user:23:credit-balance 30 
(integer) 70

redis> INCRBY user:23:credit-balance -50 
(integer) 20
```

#### Decrementing

```bash
redis> INCRBY user:23:visit-count 20
(integer) 20

redis> DECRBY user:23:visit-count 20
(integer) 0
```
