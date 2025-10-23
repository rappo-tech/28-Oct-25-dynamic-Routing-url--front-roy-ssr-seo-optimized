why we need redis cache? 
:- if you query from db then it will cost more money and slow bcoz sql query is coming from disk but if you query data from redis it is coming from ram not disk so its fast 



files
redisCache.ts==>redis.get(),redis.set(),redis.del()
backend:-protect/getUser.ts,/createUser.ts,/deleteCache.ts
frontend:-front/getUsers.tsx




flow  without redis cache 
f==>backend==>sql DB
f<==backend<==sql DB


flow  with redis cache 1st time same data (userName)
f==>backend==>redis(redis.set())==>sql Db
f<==backend<==redis(save userName)<==sql Db


flow with redis cache  2nd time same data (userName)
f==>backend==>redis(already saved,redis.get()) so no go to ==x==>    sql 
f<==backend<==redis(saved userName)


if new User is created then old cacheData is false so when we createNewUser the we delete old cache by redis.del() and we again fetch data from sql db disk  and set it in cache redis.set()

