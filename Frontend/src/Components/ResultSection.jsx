import React from 'react'
import ScoreChart from './ScoreChart'
const ResultSection = ({data}) => {
    return (
        <div className='min-h-screen width-100 flex flex-col justify-center   '>
             <div className='bg-white-500 shadow-md border border-gray-200  rounded-2xl p-1 w-[80%] mx-auto '>
                 <h1 className='text-3xl p-2 '> Resume Analysis Report </h1>
                 <p className='px-3'>Detected Role:{data } </p>
                 </div>   
              {/* Score Chard and overall all , total indiviual Score */}
            <div className=' p-4  m-3   flex flex-row justify-center  border border-gray-200 rounded-2xl w-[80%] mx-auto   '>
                 <div className=' flex flex-col w-[50%] ' > 
                   <div className='justify-center w-[50%]'> 
                       <h1 className='text-4xl'>{data.atsScore}</h1> 
                       <p>Overall ATS score </p>
                   </div>
                   <div className='w-[50% ]'>
                     <p>{data. } </p>
                   </div>
                 </div>
                 <div>

                 </div>
            </div>

        </div>
    )
}

export default ResultSection 