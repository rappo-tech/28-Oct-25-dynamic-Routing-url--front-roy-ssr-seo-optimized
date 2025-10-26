import redis from "./redisClient";

export async function delCache(key:string) {
try{
await redis.del(key)
console.log('cache db deletd ')
}catch(error:unknown){
console.log(` an error occured ${error} `)
}
}

export  async function setCache(key:string,value:unknown,ttl=300) {
try{
await redis.setex(key,ttl,JSON.stringify(value))
console.log('set caching db sucessfully ')
}catch(error:unknown){
console.log(`an err occured ${error}`)
}
}

export  async function getCache<T>(key:string):Promise<T | null> {
  try{
const data=await redis.get<T>(key)
console.log(`sucesfully get the cache `)
return data
  }catch(error:unknown){
console.log(`an  errro occured ${error}`)
return null
  }
}