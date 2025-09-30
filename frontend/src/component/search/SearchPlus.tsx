
import DrawerButton from "../button/DrawerButton"
import PriceRangeSlider from "../priceRangeSlider/PriceRangeSlider"



export default function SearchPlus() {








    return (<>


        <div className=" flex flex-col gap-4  ">

            <DrawerButton buttonText={'محدوده ی قیمت'} className={'p-2  mx-auto mt-2 w-9/10  '} >
                <div className="slider border-dashed border-b pb-2 ">
                    <PriceRangeSlider />
                </div>

            </DrawerButton>
        </div>


    </>)

}