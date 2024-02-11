# Lists Fundamentals

- Ordered collection of Strings
- Duplicates are allowed
- Elements can be added and removed at Left or Right
- Elements can be inserted relative to another
- Used to implement Stacks and Queues 
- Are not nested
- Implemented as a linked list

## Commands 

### `[LPUSH]`(https://redis.io/commands/lpush/)

`LPUSH key element [element ...]`

Insert all the specified values at the head of the list stored at key

```bash
redis> LPUSH mylist "world"
(integer) 1
redis> LPUSH mylist "hello"
(integer) 2
redis> LRANGE mylist 0 -1
1) "hello"
2) "world"
redis> 
```

### `[RPUSH]`(https://redis.io/commands/rpush/)

`RPUSH key element [element ...]`

Insert all the specified values at the tail of the list stored at key

```bash
redis> RPUSH mylist "hello"
(integer) 1
redis> RPUSH mylist "world"
(integer) 2
redis> LRANGE mylist 0 -1
1) "hello"
2) "world"
redis> 
```

### [`LLEN`](https://redis.io/commands/llen/)

`LLEN key`

Returns the length of the list stored at key

```bash
redis> LPUSH mylist "World"
(integer) 1
redis> LPUSH mylist "Hello"
(integer) 2
redis> LLEN mylist
(integer) 2
redis> 
```

### [`LRANGE`](https://redis.io/commands/lrange/)

`LRANGE key start stop`

Returns the specified elements of the list stored at key

```bash
redis> RPUSH mylist "one"
(integer) 1
redis> RPUSH mylist "two"
(integer) 2
redis> RPUSH mylist "three"
(integer) 3
redis> LRANGE mylist 0 0
1) "one"
redis> LRANGE mylist -3 2
1) "one"
2) "two"
3) "three"
redis> LRANGE mylist -100 100
1) "one"
2) "two"
3) "three"
redis> LRANGE mylist 5 10
(empty array)
redis> 
```

### Use cases

- Activity Stream
- Inter process communication
