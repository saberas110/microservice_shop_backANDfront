import { useState } from "react";
import { Range } from "react-range";

export default function PriceRangeSlider() {
  const [values, setValues] = useState([6000000, 100000000]); // مقدار شروع و پایان


  const handleInputChange = (index:number, value:string)=>{
    const numbericValue = Number(value.replace(/,/g, ""))

    if(!isNaN(numbericValue)){

      const newValue = [...values]
      newValue[index] = numbericValue
      setValues(newValue)
    }

      
  }
   
  
  return (
    <div className="w-60 mx-auto pb-2  ">
      <Range
        step={1000}
        min={1000000}
        max={100000000}
        values={values}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="h-2 bg-gray-300 rounded relative"
            style={{ ...props.style }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="w-5 h-5 bg-blue-500 rounded-full shadow cursor-pointer"
          />
        )}
      />
      <div className="flex justify-between mt-3">
        <span>شروع: {values[0].toLocaleString()}</span>
        <span>پایان: {values[1].toLocaleString()}</span>
       
      </div>
          <div className=" bg-gray-300 mt-4 p-2 flex gap-2 rounded" >
            <p>از</p>
             <input step={1000} type="text" value={values[0].toLocaleString()} onChange={(e)=>handleInputChange(0, e.target.value)}  className=" bg-white rounded" />
          </div>
          <div className=" bg-gray-300 mt-4 p-2 flex gap-2 rounded">
            <p>تا</p>
             <input step={1000} type="text" value={values[1].toLocaleString()} onChange={(e)=>handleInputChange(1, e.target.value)}   className=" bg-white rounded" />
          </div>

    </div>
  );
}
