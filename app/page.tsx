'use client'
import axios from "axios";
import Card from "./components/Card";
import { useState, useEffect } from "react";

import { Skeleton } from "@/components/ui/skeleton"



export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.allorigins.win/get?url=${encodeURIComponent("https://loripsum.net/api/4/long")}`
        );
        
        // Split the response by </p> and filter out any empty elements
        const paragraphs = response.data.contents.split('</p>').map((p:string) => 
          p.replace('<p>', '').trim()  // remove opening tag and trim whitespace
        ).filter(Boolean);  // remove any empty strings
        
        console.log(paragraphs);
        setData(paragraphs)
      } catch (err) {
        console.error(err);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  ;
  return (
    <div className="bg-white h-96">
        <div className="grid grid-col-2 md:grid-cols-4  mb-4 text-center text-white ">
           <button className={` ${activeTab == 1?"bg-[#07597A]" : "bg-[#1A1A1A]"  } w-full hover:bg-[#262626] h-20`} onClick={()=>setActiveTab(1)}>Task 1 </button>
           <button className={` ${activeTab == 2?"bg-[#07597A]" : "bg-[#1A1A1A]"  } w-full hover:bg-[#262626]`} onClick={()=>setActiveTab(2)}>Task 2 </button>
           <button className={` ${activeTab == 3?"bg-[#07597A]" : "bg-[#1A1A1A]"  } w-full hover:bg-[#262626]`} onClick={()=>setActiveTab(3)}>Task 3 </button>
           <button className={` ${activeTab == 4?"bg-[#07597A]" : "bg-[#1A1A1A]"  } w-full hover:bg-[#262626]`} onClick={()=>setActiveTab(4)}>Task 4 </button>
        </div>
        {loading ?  <div>
          <Skeleton className='h-20 w-24' />
          <Skeleton className="h-76 w-full" />

        </div> : error ? <p className="text-center text-red-500">{error}</p> : <Card activeTab={activeTab} data={data} /> }
       
    </div>
  );
}
