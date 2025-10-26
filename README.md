PROBLEM:- how  do refrells  works techinacally? how  do influncer verifies thah through his refrellls  how many veiwer/userCame to main website?
SOLUTION:- 1st onbroad the  influncer by  fillling his influncer metadata then save that influncer metadata in bakend api in postgress db and generate a unique influncer specific-url to that influncer then  also save that influncer specific-url with that influncer  metadata  in backend api-ppostgress db (onBoardInfluncer.tsx,onBoardInfluncer.ts)
now  influncer will put that influncer specific-url in thier vdo discription and 
when  any VEIWER/USER will click that influncer specific-url
then that influncer specific-url will go to do (veiwerClicks.tsx) here  the 2 things happens  1st this will redirect to  (mainWebsite.com)  and 2nd  it will extract influncerName,userIp address ,userDeviceInfo,time  from req an send back to the backend api(veiwerClicks.ts) and here all  influncerName,userIp address ,userDeviceInfo,time save into influncer`s  name postgress db table as proof if influncer ask show me how many  people come through my vidoe discription i have to show it to them . 


relevent FILES to look  for :-
1./front/createUser/page.tsx
2./backend/createInfluncer/route.ts 
3./promo/[channelName]/page.tsx
4./backend/route.ts

26-Oct-2025-referalls-veiwer-count-via-influncers

