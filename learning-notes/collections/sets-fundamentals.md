# Sets Fundamentals

- Unordered collection of unique strings
- Do not allow for nesting
- Allows for set operations
  - Difference 
  - Intersect 
  - Union
- Can be used to answer question like:
  - Did I see this IP in the last hour?
  - Is this user online?
  - Has this URL been blacklisted?

## [`SAAD`](https://redis.io/commands/sadd/)

Add the specified members to the set stored at key

`SAAD key member [member...]`

```bash
redis> SADD myset "Hello"
(integer) 1
redis> SADD myset "World"
(integer) 1
redis> SADD myset "World"
(integer) 0
redis> SMEMBERS myset
1) "Hello"
2) "World"
redis> 
```

## [`SMEMBERS`](https://redis.io/commands/smembers/)

Returns all the members of the set value stored at key.

`SMEMBERS key`

```bash
redis> SADD myset "Hello"
(integer) 1
redis> SADD myset "World"
(integer) 1
redis> SMEMBERS myset
1) "Hello"
2) "World"
redis> 
```

## [`SSCAN`](https://redis.io/commands/sscan/)

Cursor-based mechanism to retrieve set elements.

`SSCAN key cursor [MATCH pattern] [COUNT count]`

## [`SISMEMBER`](https://redis.io/commands/sismember/)

Returns if member is a member of the set stored at key.

`SISMEMBER key member`

```bash
redis> SADD myset "one"
(integer) 1
redis> SISMEMBER myset "one"
(integer) 1
redis> SISMEMBER myset "two"
(integer) 0
redis>
```

## [`SREM`](https://redis.io/commands/srem/)

Remove the specified members from the set stored at key.

`SREM key member [member ...]`

```bash
redis> SADD myset "one"
(integer) 1
redis> SADD myset "two"
(integer) 1
redis> SADD myset "three"
(integer) 1
redis> SREM myset "one"
(integer) 1
redis> SREM myset "four"
(integer) 0
redis> SMEMBERS myset
1) "two"
2) "three"
redis> 
```

## [`SPOP`](https://redis.io/commands/spop/)

Removes and returns one or more random members from the set value store at key.

`SPOP key [count]`

```bash
redis> SADD myset "one"
(integer) 1
redis> SADD myset "two"
(integer) 1
redis> SADD myset "three"
(integer) 1
redis> SPOP myset
"three"
redis> SMEMBERS myset
1) "one"
2) "two"
redis> SADD myset "four"
(integer) 1
redis> SADD myset "five"
(integer) 1
redis> SPOP myset 3
1) "two"
2) "four"
3) "five"
redis> SMEMBERS myset
1) "one"
redis>
```

## Operations 

<p align="center">
  <img src="../../.github/images/sets-operations-1.png" style="display: inline;">
  <img src="../../.github/images/sets-operations-2.png" style="display: inline;">
</p>

````bash
redis> SAAD "venue-subway:Makuhari Messe" "Keiyo Line"
1
redis> SAAD "venue-subway:Tokyo Tatsumi Internal Swimming Center" "Keiyo Line" "Rinkai Line" 
2
redis> SINTER "venue-subway:Makuhari Messe" "venue-subway:Tokyo Tatsumi Internal Swimming Center"
1) "Keiyo Line"
````

## Use cases

- Unique visitors:
  - Create set with URL + Time period 
  - SAAD about.html:20180210 jim jane john
  - SSCAN about.html:20180210 match*
  - EXPIRE about.html:20180210 86400
