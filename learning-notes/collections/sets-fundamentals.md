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
