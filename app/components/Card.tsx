import React from 'react'

interface CardProps {
     activeTab: number;
     data: string[];   
}

const Card = ({activeTab, data}:CardProps) => {
  return (
    <div className='flex flex-col gap-2 mx-16'>
        <h1 className='text-3xl font-bold'>Title {activeTab}</h1>
        <p className='text-lg'>{data[activeTab-1]}</p>
    </div>
  )
}

export default Card
