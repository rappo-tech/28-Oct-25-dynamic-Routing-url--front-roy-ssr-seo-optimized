/*
page.tsx===>page.tsx==>clientSection.tsx==>page.tsx===>clientSection.tsx 





1.practice 3 times with dynamic url routing only for getOtherAllVideo.tsx & 
getOtherOneVideo  with actual sql db 

2.dynamic  url routing + query static url routing
// Product page: /product/vivo-832273
<button onClick={() => router.push(`/checkout?itemId=832273`)}>
  Buy Now
</button>
// Checkout page: /checkout?itemId=832273
'use client'
export default function Checkout({searchParams}) {
  const itemId = searchParams.itemId  // "832273"
  
---------------------------------------------------------------------------------------------------
yt clone:- 

1.createOwnUserprofile=/checkout?itemId=832273
2.getGlobalFeed=/checkout?itemId=832273
4.edit OwnProfile=/checkout?itemId=832273
5.deleteOwnProfile=/checkout?itemId=832273
6.createOwnChannel=/checkout?itemId=832273
7.uploadOwnVdo=/checkout?itemId=832273
8.deleteOwnVdo=/checkout?itemId=832273
12.subscribeToOtherChannel=/checkout?itemId=832273
13.likeToOtherVdo=/checkout?itemId=832273
14.commentOnOthersVdo=/checkout?itemId=832273

3.srchOthersVdo===>yt/results?search_query=zootopia+
9.getOtherAllVdo=>[userName]/page.tsx/clientSection.tsx
10.getOtherSingleVdo=>[userName]/page.tsx/clientSection.tsx/[vdoId]/page.tsx/clientSection.tsx 
11.shareVdoLinkOfOther`sOneVdo=>[userName]/page.tsx/clientSection.tsx/[vdoId]/page.tsx/clientSection.tsx 


















*/