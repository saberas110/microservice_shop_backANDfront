import {iranProvinces} from "./iranProvinces.ts";
import {useState} from "react";
import {useFormContext} from "react-hook-form";

function ProvinceSelect() {
const [selectprovince,setSelectProvince] = useState()
const {register} = useFormContext()

  return (
      <div>
          <div className="flex flex-col gap-2">
              <label htmlFor="province" className="font-bold">
                  استان
              </label>
              <select {...register("province")}
                  id="province"
                  name="province"
                  className="border rounded p-2"
                  defaultValue=""
              >
                  <option value="" disabled>
                      انتخاب استان
                  </option>
                  {Object.keys(iranProvinces).map((province, index) => (
                      <option onClick={() => setSelectProvince(province)}
                              key={index} value={province}>
                          {province}
                      </option>
                  ))}
              </select>
          </div>
          <div className="flex flex-col gap-2">
              <label htmlFor="province" className="font-bold">
                  شهر
              </label>
              <select {...register("city")}
                  id="city"
                  name="city"
                  className="border rounded p-2"
                  defaultValue=""
              >
                  <option value="" disabled>
                      انتخاب شهر
                  </option>
                  {iranProvinces[selectprovince]?.map((city, index)=> (
                      <option
                              key={index} value={city}>
                          {city}
                      </option>
                  ))}
              </select>
          </div>
      </div>
  );
}

export default ProvinceSelect;
