  import {
     BarChart,
     Bar ,
     XAxis ,
     YAxis , 
     CartesianGrid ,
     Tooltip ,
     Legend ,
     ResponsiveContainer , 
  } from "recharts"
const ScoreChart = ({data}) =>{
     return (
         <>
         <div className=" bg-white rounded-2xl shadow-lg p-6 ">
            <h2 className=" text-lg font-bold text-gray-800 mb-4 "> Score Breakdown </h2>
            <ResponsiveContainer width="100%" height={300}>
               <BarChart data={data}> 
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name"/>
                  <YAxis domain={[0,100]}/>
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey="score" fill="#8884d8" radius={[8,8,0,0]}/>
               </BarChart>
            </ResponsiveContainer>
         </div>
        </>
     )
}

export default ScoreChart  