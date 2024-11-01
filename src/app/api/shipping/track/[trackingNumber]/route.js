import { NextResponse } from "next/server";
import axios from "axios";

const authFedex = async ()=>{
   try{
    const InputPayload ={
        grant_type:'client_credentials',
        client_id:process.env.FEDEX_API_KEY,
        client_secret:process.env.FEDEX_SECRET,
    }
    const headers={
        'Content-Type':'application/x-www-form-urlencoded'
    }
    const response = await axios.post(`${process.env.FEDEX_API}/oauth/token`,InputPayload,{
        headers:headers
    }
    
)
return response.data
   }catch(error){
    console.log(error)
   }
}

export async function GET (req,{ params }){
   try{
   const {trackingNumber}=params;
   const authRes= await authFedex()
   
   const InputPayload ={
   includeDetailedScans:true,
    trackingInfo:[
        {
            trackingNumberInfo:{
                trackingNumber:trackingNumber,
            }
        }
    ]
   }
   const headers ={
    'Content-Type':'application/json',
     'X-local':"en_US",
     'Authorization':`Bearer ${authRes.access_token}`
   }
   const response = await axios.post(`${process.env.FEDEX_API}/track/v1/trackingnumbers`,InputPayload,
    {
        headers:headers
    }
   )
   const result = response.data.output.completeTrackResults[0].trackResults[0].scanEvents.map(item=>(
    {
        eventDescription:item.eventDescription,
        city:item.scanLocation.city
    }
   ))
   return NextResponse.json(result)
   }catch(error){
    console.log(error)
   }
}