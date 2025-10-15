
frontend caching:- useQuery()
q:-why we need  frontend caching ?? and what it do ? 
 useQuery({
  queryKey: ['userProfile', userId],
  queryFn: async () => {
    const res = await axios.get(`/api/profile/${userId}`)
    return res.data
  },)
  staleTime: 5 * 60 * 1000,
ans:-lets say  we make the get call from backend and get the data and show in return  with component but this is  unoptimized bcoz if user get the data and goes to next page  then again came to  the same page then  he again make a get req to backedn and get the same data from backend but problem is each time you make a backend call you cost money so; from  save that we use useQuery() it only 1st time get the data and store it in provider and when user visit to next page and comes to the 2nd time it didnot make the get request 2nd time it provide the data from cached memory 

q:-prevent is page chnaging i get it totally if user goes to explaore sectionon and watch my all couress then and comback to user profile then if i use useeffect then sure the both call is neccesary bcoz data dont chnage but what if user goes to setting and chnage his img then again he come to user profile then if i use useQury then the user will see his old img which was save inthecached data but user has change his pic now in that case how will useQuery knew that the data it is showing tothe user is old one and now user has cahnge the data
ans:- yes, to prevent  that  we use the invalidateQuery fucntion basically any function that can chnage the data in that fcuntion we make that fucntion  invalidate the query that change the date like both are realted 
if we updateTheUser then userProfile is going  to change so we updateProfile  is direclty link with how  userprofile  is gonna look like 
getUserProfile===querykey['userProfile']
updateUserprofile===invalidteQuery{[querykey:'userProfile']}


all fileName 
npm install tanstack 
make a provider.tsx file below layout.tsx 
sandwitched  <Provider>{children}<provider> in layout.tsx

frontend:-
front/getUser.tsx==querykey['userProfile']
front/createUser.tsx==invalidteQuery{[querykey:'userProfile']}

backend:-
protect/getUser.ts 
protect/createUser.ts