import { QRData } from '@/src/store/crusher';
import dayjs from 'dayjs';
import { decompressFromEncodedURIComponent } from 'lz-string';
import { useRouter } from 'next/router';

type Props = { searchParams: { d?: string } };

export default function QRPage({ searchParams }: Props) {

  const router = useRouter();
  const raw = router.query?.d;

  let data: QRData |null = null;
  let error: string | null = null;

  if (!raw) {
    error = 'Missing compressed data.';
  } else if (typeof raw !== 'string') {
    error = 'Invalid query parameter format.';
  } else {
    try {
      const json = decompressFromEncodedURIComponent(raw);
      data = json ? JSON.parse(json) : null;
    } catch {
      error = 'Failed to decompress or parse data.';
    }
  }



  return (
    <main className="p-6">
    <p className='text-center w-full font-semibold'>Form &apos;Q&apos;</p>
    <p className='text-center w-full font-semibold'>Crusher Weightment Slip</p>
    {error ? (
      <p className="text-red-600">{error}</p>
    ) : (
      <div className="overflow-auto">
        
        <table className="min-w-full border-2 border-gray-400 rounded">
         
          <tbody>
           
              
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>No./SlipID</td>
                    <td className='px-4 py-2 font-bold'>{String(data?.slip_id)}</td>
                </tr>
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>Order Date:</td>
                    <td className='px-4 py-2 font-bold'>{String(dayjs(data?.order_date).format("DD-MM-YYYY"))}</td>
                </tr>
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>Material:</td>
                    <td className='px-4 py-2 font-bold'>{String(data?.material)}</td>
                </tr>
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>Name of the Crusher/screening plant:</td>
                    <td className='px-4 py-2 font-bold'>{String(data?.crusher_name)}</td>
                </tr>
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>Crusher/screening Address:</td>
                    <td className='px-4 py-2 font-bold'>{String(data?.crusher_address)}</td>
                </tr>
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>GST no. of the Crusher/screening plant:</td>
                    <td className='px-4 py-2 font-bold'>{String(data?.crusher_gst)}</td>
                </tr>
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>Name of the Consignee:</td>
                    <td className='px-4 py-2 font-bold'>{String(data?.consignee_name)}</td>
                </tr>
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>Category of Consignee:</td>
                    <td className='px-4 py-2 font-bold'>{String(data?.consignee_category)}</td>
                </tr>
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>Mobile Number of consignee:</td>
                    <td className='px-4 py-2 font-bold'>{String(data?.consignee_mobile)}</td>
                </tr>
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>GST No. of the consignee (if applicable):</td>
                    <td className='px-4 py-2 font-bold'>{String(data?.consignee_gst)}</td>
                </tr>
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>Destination Location of the Material:</td>
                    <td className='px-4 py-2 font-bold'>{String(data?.destination)}</td>
                </tr>
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>Vehicle no:</td>
                    <td className='px-4 py-2 font-bold'>{String(data?.vehicle_number)}</td>
                </tr>
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>Vehicle owner name:</td>
                    <td className='px-4 py-2 font-bold'>{String(data?.vehicle_owner)}</td>
                </tr>
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>Driver Name:</td>
                    <td className='px-4 py-2 font-bold'>{String(data?.driver_name)}</td>
                </tr>
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>Driver Mobile Number:</td>
                    <td className='px-4 py-2 font-bold'>{String(data?.driver_mobile)}</td>
                </tr>
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>Load carrying capacity of vehicle as per RC (kg):</td>
                    <td className='px-4 py-2 font-bold'>{String(data?.veh_capacity)}</td>
                </tr>
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>Unladen weight of vehicle as per RC (MT):</td>
                    <td className='px-4 py-2 font-bold'>{String(data?.veh_unladen)}</td>
                </tr>
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>Weight of Loaded Truck on weighbridge (MT):</td>
                    <td className='px-4 py-2 font-bold'>{String(data?.truck_weight)}</td>
                </tr>
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>Weight of material (MT):</td>
                    <td className='px-4 py-2 font-bold'>{String(data?.mat_weight)}</td>
                </tr>
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>Amount of material:</td>
                    <td className='px-4 py-2 font-bold'>{String(data?.mat_amount)}</td>
                </tr>
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>GST on material:</td>
                    <td className='px-4 py-2 font-bold'>{String(dayjs(data?.slip_validity).format("DD-MM-YYYY"))}</td>
                </tr>
                <tr className='border-t border-gray-400'>
                    <td className='px-4 py-2 font-medium border-r-2 border-gray-400 w-[50%] '>Vehicle Breakdown Time:</td>
                    <td className='px-4 py-2 font-bold'>{String(data?.veh_break_time)}</td>
                </tr>
             
          </tbody>
        </table>
      </div>
    )}
  </main>
  );
}
