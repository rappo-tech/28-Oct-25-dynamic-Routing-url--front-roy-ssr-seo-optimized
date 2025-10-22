useParams()==> /front/getUsers/johnDoe
when  you click the specific  user then url should be that name 

to do change folder structure like this 

earlier:- /front/getUsers/page.tsx
now:-  /front/getUsers/[userName]/page.tsx/page.tsx 

make the [userName]/page.tsx   inside the  getUser.tsx folder not inside the front  folder.


all Frontend= /front/...
all backend= /protect/...

why we need this struture? 
1.✅ SEO optimization
2.✅ Social media link previews
3.✅ Better analytics (“which route is popular?”)

22-oct-2025-useParams()-/front/getUsers/johnDoe-