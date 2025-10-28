true ssr server side rendering (seo optimized ) flow:-

getUsers/page.tsx  ====>1st event
http://localhost:3000/getUsers
[userName]/dataFetch.tsx/page.tsx  ====>2nd event
http://localhost:3000/front/roy
[userName]/post/[postName]/dataFetch.tsx/page.tsx/dataFetch.tsx/page.tsx  ====>3rd event
http://localhost:3000/front/roy/post/postIdRoyPost3

---------------------------------------------------------------

relavent files in :-
1.getAllUsers/page.tsx 
2.[userName]/clinetSection.tsx/page.tsx 
3.[userName]/post/[postName]/clientSection.tsx/page.tsx/ clinetSection.tsx/page.tsx 

---------------------------------------------------------------

question1 :- why use [userName]/dataFetch.tsx/page.tsx
inseated of simple file strtucture    /oneUsersData/page.tsx 
i get it [userName]/dataFetch.tsx/page.tsx ==>file strcture is good for  get  read userSepcific data  ANS:-seo,etc.



question2 :- can  i use  ,createNewPost/[userName]/page.tsx, 
deletePost/[userName]/page.tsx,updatePost/[userName]/page.tsx 
instaed  of simple createUser/page.tsx  for even all write opsn like (create,update,delete ) even if i dont use  the double file strtucture.Is this wise and industry practice and my guess is yes I should use this why?  
ANS:- Creating something NEW for an EXISTING entity? → Use params() instaed of using the zustandStore. 

parameter needs  and is moving to  another page??
1.createUser= needs nothing= x/createUser/page.tsx
2.getAllFeed= needs nothing= x/getAllPosts/page.tsx
3.getAllPostsOfOtherUser= need[OtherUser]= x/[otherUser]/4.dataFetch.tsx/page.tsx
4.getOnePostOfOtherUser= need[otherUser,postId] = x/[otherUser]/dataFetch.tsx/page.tsx/post/[postId]/datafetch.tsx/page.tsx 

5.editUserPost=  need[userName,postId] = x/[userName]/editPost/[postId].page.tsx 

6.editUserprofile= need[userName] =x/editPost[userName]/page.tsx

7.uploadVideo=need[userName]= x/[userName]/page.tsx or simply uploadVdo/page.tsx 
8.likeVideo=no need to move to other page 
9.commentOnOthersVideo= no need to move to another page
10.shareOthersVideo=no need to move to another page 
11.setting= no need to move 


real  need= [userName]/page.tsx and all 
1st.it has to move to another page (eg.user upload a new post,get AllData From OtherUser)
2nd.while moving it also carry data from this page to that page 



question 3:-when users srches anything how thier url get like 
https://x.com/search?q=bundy&src=typed_query why not simple url like:- localhost/srch/page.tsx  = req.query() ???

28-Oct-25-dynamic-Routing-url-/front/roy-ssr-seo-optimized
