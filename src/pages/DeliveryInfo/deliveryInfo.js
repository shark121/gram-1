
import { useRef } from "react"
import { useState } from "react"
import DialogModal from "../../../components/ui/Dialog/dialog"


export default function DeliveryInfo({setHasProvidedInformation,handleOnClick, setShouldDisplayShippingInfoWindow, setFullNameState, setPhoneNumberState, setAddressState, setCityState, setRegionState, setAddressDescriptionState}){  
    const dialogOneContent = "Are you you have provided the correct information?"
    const[isDialogOneOpen, setIsDialogOneOpen] = useState(false)
    const[isDialogTwoOpen, setIsDialogTwoOpen] = useState(false)

    function childFunction(){
        setHasProvidedInformation(true)
        setShouldDisplayShippingInfoWindow(false)
        handleOnClick()
    }

    return<div className="flex items-center justify-center h-full w-full p-4 flex-col">
        <h1 className="uppercase my-4">Enter Shipping Info</h1>
        <div className="flex flex-col gap-4 w-[20rem]">
            <input type="text" placeholder="Full Name"  onChange={e=>setFullNameState(e.target.value)} className="p-2 rounded-md "/>
            <input type="text" placeholder="Phone Number"  onChange={e=>setPhoneNumberState(e.target.value)} className="p-2 rounded-md"/>
            <input type="text" placeholder="Address" onChange={e=>setAddressState(e.target.value)} className="p-2 rounded-md"/>
            <input type="text" placeholder="City" onChange={e=>setCityState(e.target.value)} className="p-2 rounded-md"/>
            <input type="text" placeholder="Region" onChange={e=>setRegionState(e.target.value)} className="p-2 rounded-md"/>
            <textarea type="text" placeholder="further details of address" rows={6} onChange={e=>setAddressDescriptionState(e.target.value)} className="p-2 rounded-md"/>
            {/* <button className="p-2 bg-gray-800 text-white rounded-md "  onClick={()=>handleSubmition()}>Done</button> */}
            <DialogModal isOpen={isDialogOneOpen} setIsOpen={setIsDialogOneOpen} submitFunction={childFunction} sumbitText={dialogOneContent}/>
        </div>
    </div>
} 