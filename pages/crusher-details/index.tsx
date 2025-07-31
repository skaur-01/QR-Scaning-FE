import { HomeIcon, MenuIcon } from '@/src/assets/SvgIcons';
import GenrateQr from '@/src/components/genrate-qr/GenrateQr';
import { useQRStore } from '@/src/store/crusher';
import dayjs from 'dayjs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useRef } from 'react'

const CrusherDetails = () => {

    const { data } = useQRStore();

    const contentRef = useRef<HTMLDivElement>(null);

    const isExpired = (dateString: string): boolean => {
        const now = dayjs();
        const givenDate = dayjs(dateString);
        return givenDate.isBefore(now); // compares full date + time
    };

    const handleDownload = async () => {
        const element = contentRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height],
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('page.pdf');
    };


    if (isExpired(data?.slip_validity)) {

        return <div className='text-2xl font-semibold text-center mt-[30vh]'> This is expired link!</div>
    }

    return (
        <>
            <div><button onClick={handleDownload} >Download</button></div>
            <div ref={contentRef} className='p-6'>
                <p className='text-left text-2xl w-full font-semibold'>Stone Crusher Account for Mineral Sale Management and Monitoring</p>
                <p className='text-left text-xl w-full '>(index.php)</p>
                <p className='text-right  w-full '>Log in As: {data?.user_email} </p>
                <p className='text-left text-2xl  w-full '>Orders Management </p>
                <div className='flex items-center mt-6'>
                    <HomeIcon /> <p>Home (https://minesandgeology.punjab.gov.in/stone/index.php)</p>
                </div>
                <p>Orders (https://minesandgeology.punjab.gov.in/stone/index.php?c=orders&Cid=9)</p>
                <div className='flex text-lg items-center gap-1 border-b-1 border-l-1 border-gray-300 pl-2 pb-1 mt-4'><MenuIcon /> Order Detail :</div>
                <p className='text-center w-full font-semibold'>Form &apos;Q&apos;</p>
                <p className='text-center w-full font-semibold'>Crusher Weightment Slip</p>
                <div className='flex flex-col gap-y-8 border-l-1 border-blue-200 pl-4'>

                    <div className='flex gap-3'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>No./SlipID</p>
                        <p className=' font-semibold' >{data?.slip_id}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>Order Date:</p>
                        <p className=' font-semibold' >{dayjs(data?.order_date).format("DD-MM-YYYY")}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>Material:</p>
                        <p className=' font-semibold' >{data?.material}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>Name of the Crusher/screening plant:</p>
                        <p className=' font-semibold' >{data?.crusher_name}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>Crusher/screening Address:</p>
                        <p className=' font-semibold' >{data?.crusher_address}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>GST no. of the Crusher/screening plant:</p>
                        <p className=' font-semibold' >{data?.crusher_gst}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>Name of the Consignee:</p>
                        <p className=' font-semibold' >{data?.consignee_name}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>Category of Consignee:</p>
                        <p className=' font-semibold' >{data?.consignee_category}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>Mobile Number of consignee:</p>
                        <p className=' font-semibold' >{data?.consignee_mobile}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>GST No. of the consignee (if applicable):</p>
                        <p className=' font-semibold' >{data?.consignee_gst}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>Destination Location of the Material:</p>
                        <p className=' font-semibold' >{data?.destination}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>Vehicle no:</p>
                        <p className=' font-semibold' >{data?.vehicle_number}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>Vehicle owner name:</p>
                        <p className=' font-semibold' >{data?.vehicle_owner}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>Driver Name:</p>
                        <p className=' font-semibold' >{data?.driver_name}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>Driver Mobile Number:</p>
                        <p className=' font-semibold' >{data?.driver_mobile}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>Load carrying capacity of vehicle as per RC (kg):</p>
                        <p className=' font-semibold' >{data?.veh_capacity}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>Unladen weight of vehicle as per RC (MT):</p>
                        <p className=' font-semibold' >{data?.veh_unladen}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>Weight of Loaded Truck on weighbridge (MT):</p>
                        <p className=' font-semibold' >{data?.truck_weight}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>Weight of material (MT):</p>
                        <p className=' font-semibold' >{data?.mat_weight}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>Amount of material:</p>
                        <p className=' font-semibold' >{data?.mat_amount}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>GST on material:</p>
                        <p className=' font-semibold' >{dayjs(data?.slip_validity).format("DD-MM-YYYY")}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>Validity of weighment slip(Date/Time)</p>
                        <p className=' font-semibold' >{dayjs(data?.slip_validity).format("DD-MM-YYYY hh:mm A ")}</p>
                    </div>

                     <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '>Vehicle Breakdown Time:</p>
                        <p className=' font-semibold' >{data?.veh_break_time}</p>
                    </div>
                    <div className='flex gap-4'>
                        <p className='max-w-[180px] min-w-[180px] text-sm text-right '></p>
                         <GenrateQr data={data} />
                    </div>
                   
                </div>

                <div className='flex gap-8 font-semibold py-8 mt-4 border pl-2 border-gray-300 '>
                    <button>Submit</button>
                    <button>Cancel</button>

                </div>
            </div>
        </>
    )
}

export default CrusherDetails;