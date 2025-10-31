Dynamic Url Routing vs static Url Routing 
---------------------------------------------------------------

before  Dynamic Url Routing
#files:-app/front/getAllPostOfOther/page.tsx 
#url:-Domain.com/getAllPostOfOtherUser/
#navigation from 1 page to another:- via link from earlier page <link href={front/getAllPostOfOther}><button><link>
#data transfer of userName:-store data  in earlier page in zustandStore and get in current getAllPostOfOther page
---------------------------------------------------------------

after Dynamic Url Routing 
#files:-app/front/[userName]/page.tsx/clientSection.tsx
#url:-Domain.com/actualUserName 
#navigation from 1 page to another:-useRouter.push(
    `front/[userName]/` )
#data transfer of userName:- during navigation to another page 
---------------------------------------------------------------
QUESTION:-why we need this extra complex file strtuce ? 
ANSWER:- 
1.That URL can be shared and opened independently direclty like user dont 1st have to go to app then  /front===>then /front/getALlVideos==>then /front/getALlVideos/srch  
then find one like any user share just url then that url just open that specifc user vdo 


2.data transfer and navigation happend in just in 1 short no need to use zustand store to set data  in 1st page and get data
in another page 

3.each  URL itself uniquely identifies

4.You need to fetch data on the server for that specific resource. for seo so in that way vdo is preFecthed and now google indexed true server side rendering ssr  thatwhy we use next js  
---------------------------------------------------------------
QUESTION:-so from now should we make each file and feature dynamic url routing and  just abondon the static url routing 
ANSWER:- criteria for using dynamic url routing it needs to fullfill all 3 
1.does this opernation need to go to diffrent page; 
eg.=createPost.tsx
2.does this opernation  need to take data from one page to another page eg.=getOther`sVdo.tsx
3.if i share the url then does it will load the same data to another`s user browser eg.=getOthers`sVdo.tsx 
---------------------------------------------------------------
example lets says we make yt clone with this feature  wher we need dynamic url routing and static url routing 


need dynamic url:-
✅ 9. getOthersAllVdo       → /[userName]/page.tsx/clientSection.tsx
✅ 10. getOthersOneVdo      → [userName]/singlePost/[postName]/page.tsx/clientSection.tsx/page.tsx/clientSection.tsx
✅ 11. shareVdoLink         → Same as #10 (just copy URL)
✅ 3. searchVdo             → /results?search_query=...


no need dynamic url:-
❌ 1. createProfile         → /signup (static)
❌ 2. getGlobalFeed        → /feed (static)
❌ 4. editProfile          → /account (static)
❌ 5. deleteProfile        → /account (confirmation modal)
❌ 6. createChannel        → /channel/create (static)
❌ 7. uploadVdo            → /upload (static)
❌ 8. deleteVdo            → /studio/videos (list + delete)
❌ 12. subscribe           → API call only
❌ 13. like                → API call only
❌ 14. comment             → API call only

---------------------------------------------------------------
