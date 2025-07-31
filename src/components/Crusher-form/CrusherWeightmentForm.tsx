import { useQRStore } from '@/src/store/crusher';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Divider, TextField } from '@mui/material';
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';


export const schema = yup.object({
    user_email: yup
        .string()
        .email('User Email is not valid')
        .required('User Email is required'),

    slip_id: yup.string().required('Slip ID is required'),

    order_date: yup
        .date()
        .typeError('Order date must be a valid date')
        .required('Order date is required'),

    material: yup.string().required('Material is required'),

    crusher_name: yup.string().required('Crusher Name is required'),
    crusher_address: yup.string().required('Crusher Address is required'),
    crusher_gst: yup.string().required('Crusher GST is required'),

    consignee_name: yup.string().required('Consignee Name is required'),
    consignee_category: yup.string().required('Consignee Category is required'),
    consignee_mobile: yup.string().required('Consignee Mobile is required'),
    consignee_gst: yup.string().required('Consignee GST is required'),

    destination: yup.string().required('Destination is required'),

    driver_name: yup.string().required('Driver Name is required'),
    driver_mobile: yup.string().required('Driver Mobile is required'),

    vehicle_owner: yup.string().required('Vehicle Owner is required'),
    vehicle_number: yup.string().required('Vehicle Number is required'),

    veh_capacity: yup
        .number()
        .typeError('Vehicle Capacity must be a number')
        .min(0, 'Vehicle Capacity must be greater than 0').required("This is required"),
    veh_unladen: yup
        .number()
        .typeError('Unladen Weight must be a number')
        .min(0, 'Unladen Weight must be greater than 0')
        .required('Unladen Weight is required'),

    truck_weight: yup
        .number()
        .typeError('Truck Weight must be a number')
        .min(0, 'Truck Weight must be greater than 0')
        .required('Truck Weight is required'),

    mat_weight: yup
        .number()
        .typeError('Material Weight must be a number')
        .min(0, 'Material Weight must be greater than 0')
        .required('Material Weight is required'),

    mat_amount: yup
        .number()
        .typeError('Material Amount must be a number')
        .min(0, 'Material Amount must be greater than 0')
        .required('Material Amount is required'),

    mat_gst: yup.string().required('Material GST is required'),

    slip_validity: yup
        .date()
        .typeError('Slip Validity must be a valid date')
        .required('Slip Validity is required'),

    status: yup.string().required('Status is required'),

    veh_break_time: yup.string().required("This is required"),
});

type FormValues = yup.InferType<typeof schema>;

const CrusherWeightmentForm = () => {

    const { setData } = useQRStore();
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            user_email: '',
            slip_id: '',
            order_date: dayjs().toDate(),
            material: '',
            crusher_name: '',
            crusher_address: '',
            crusher_gst: '',
            consignee_name: '',
            consignee_category: '',
            consignee_mobile: '',
            consignee_gst: '',
            destination: '',
            driver_name: '',
            driver_mobile: '',
            vehicle_owner: '',
            vehicle_number: '',
            veh_capacity: 0,
            veh_unladen: 0,
            truck_weight: 0,
            mat_weight: 0,
            mat_amount: 0,
            mat_gst: '',
            slip_validity: dayjs().toDate(),
            status: '',
            veh_break_time: '',
        },
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        console.log(data);
        setData(data)
        router.push("/crusher-details")

        // do something with data
    };
    return (
        <Box className="max-h-[80vh] overflow-y-auto mt-10">
            <LocalizationProvider dateAdapter={AdapterDayjs}>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className=' p-10 pt-0 '
                    sx={{ mx: 'auto', mt: 6 }}
                >
                    <h2 className='text-xl font-semibold border-1  w-fit px-4 pt-2 border-b-0 rounded-t-2xl  bg-gray-100' >Basic Details </h2>
                    <Divider sx={{ marginBottom: 4, backgroundColor: 'black' }} />

                    <Box className='grid grid-cols-3 gap-6' >

                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>User Email
                            </label>
                            <Controller
                                name="user_email"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder='Enter User Email'
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                    />
                                )}
                            />
                        </Box>
                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>SLIP ID
                            </label>
                            <Controller
                                name="slip_id"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        // label="First name"
                                        placeholder='Enter SLIP ID'
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                    />
                                )}
                            />
                        </Box>

                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Order Date

                            </label>
                            <Controller
                                name="order_date"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <DatePicker
                                        value={field.value ? dayjs(field.value) : null}
                                        onChange={(date: Dayjs | null) => field.onChange(date?.toDate() || null)}
                                        slotProps={{
                                            textField: {
                                                error: !!fieldState.error,
                                                helperText: fieldState.error?.message,
                                                fullWidth: true,
                                                placeholder: "Enter Order Date",
                                                variant: "filled"
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Box>

                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Material
                            </label>
                            <Controller
                                name="material"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder='Enter Material'
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                    />
                                )}
                            />
                        </Box>
                    </Box>

                    <h2 className='text-xl font-semibold border-1  w-fit px-4 pt-2 border-b-0 rounded-t-2xl  bg-gray-100 mt-10' >Crusher Details </h2>
                    <Divider sx={{ marginBottom: 6, backgroundColor: 'black' }} />

                    <Box className='grid grid-cols-3 gap-6' >

                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Crusher Name
                            </label>
                            <Controller
                                name="crusher_name"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder='Enter Crusher Name'
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                    />
                                )}
                            />
                        </Box>

                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Crusher address
                            </label>
                            <Controller
                                name="crusher_address"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder='Enter Crusher address'
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                    />
                                )}
                            />
                        </Box>

                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Crusher GST
                            </label>
                            <Controller
                                name="crusher_gst"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder='Enter Crusher GST'
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                    />
                                )}
                            />
                        </Box>
                    </Box>
                    <h2 className='text-xl font-semibold border-1  w-fit px-4 pt-2 border-b-0 rounded-t-2xl  bg-gray-100 mt-10' >Consignee Details </h2>
                    <Divider sx={{ marginBottom: 6, backgroundColor: 'black' }} />

                    <Box className='grid grid-cols-3 gap-6' >
                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Consignee Name
                            </label>
                            <Controller
                                name="consignee_name"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder='Enter Consignee Name'
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                    />
                                )}
                            />
                        </Box>

                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Consignee Category
                            </label>
                            <Controller
                                name="consignee_category"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder='Enter Consignee category'
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                    />
                                )}
                            />
                        </Box>

                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Consignee Mobile
                            </label>
                            <Controller
                                name="consignee_mobile"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder='Enter Consignee Mobile'
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                    />
                                )}
                            />
                        </Box>

                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Consignee GST
                            </label>
                            <Controller
                                name="consignee_gst"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder='Enter Consignee GST'
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                    />
                                )}
                            />
                        </Box>

                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Destination
                            </label>
                            <Controller
                                name="destination"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder='Enter Destination'
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                    />
                                )}
                            />
                        </Box>
                    </Box>

                    <h2 className='text-xl font-semibold border-1  w-fit px-4 pt-2 border-b-0 rounded-t-2xl  bg-gray-100 mt-10' >Driver & Vehicle Details </h2>
                    <Divider sx={{ marginBottom: 6, backgroundColor: 'black' }} />

                    <Box className='grid grid-cols-3 gap-6' >

                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Driver Name
                            </label>
                            <Controller
                                name="driver_name"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder='Enter Driver Name'
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                    />
                                )}
                            />
                        </Box>
                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Driver Mobile
                            </label>
                            <Controller
                                name="driver_mobile"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder='Enter Mobile'
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                    />
                                )}
                            />
                        </Box>
                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Vehicle Owner
                            </label>
                            <Controller
                                name="vehicle_owner"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder='Enter Vehicle Owner'
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                    />
                                )}
                            />
                        </Box>
                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Vehicle Number
                            </label>
                            <Controller
                                name="vehicle_number"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder='Enter Vehicle Number'
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                    />
                                )}
                            />
                        </Box>
                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Vehicle Capacity (KG)
                            </label>
                            <Controller
                                name="veh_capacity"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        type="number"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                        placeholder='Enter Vehicle Capacity'
                                    />
                                )}
                            />
                        </Box>
                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Vehicle Unladen Weight (MT)
                            </label>
                            <Controller
                                name="veh_unladen"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder="Enter Vehicle Unladen Weight MT"
                                        type="number"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                    />
                                )}
                            />
                        </Box>
                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Truck Weight (MT)
                            </label>
                            <Controller
                                name="truck_weight"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder="Enter Truck Weight"
                                        type="number"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                    />
                                )}
                            />
                        </Box>
                    </Box>

                    <h2 className='text-xl font-semibold border-1  w-fit px-4 pt-2 border-b-0 rounded-t-2xl  bg-gray-100 mt-10' >Material Details </h2>
                    <Divider sx={{ marginBottom: 6, backgroundColor: 'black' }} />

                    <Box className='grid grid-cols-3 gap-6' >


                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Material Weight
                            </label>
                            <Controller
                                name="mat_weight"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        type="number"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                        placeholder='Enter Material Weight'
                                    />
                                )}
                            />
                        </Box>
                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Material Amount
                            </label>
                            <Controller
                                name="mat_amount"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder="Enter Material Amount"
                                        type="number"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                    />
                                )}
                            />
                        </Box>
                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Material GST
                            </label>
                            <Controller
                                name="mat_gst"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder="Enter Material GST"
                                        type="number"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                    />
                                )}
                            />
                        </Box>
                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Slip validity

                            </label>
                            <Controller
                                name="slip_validity"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <DateTimePicker
                                        value={field.value ? dayjs(field.value) : null}
                                        onChange={(date: Dayjs | null) => field.onChange(date?.toDate() || null)}
                                        slotProps={{
                                            textField: {
                                                error: !!fieldState.error,
                                                helperText: fieldState.error?.message,
                                                fullWidth: true,
                                                placeholder: "Select Slip validity",
                                                variant: "filled"
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Box>

                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Status
                            </label>
                            <Controller
                                name="status"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder="Enter Status"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                    />
                                )}
                            />
                        </Box>
                        <Box className="flex flex-col gap-2" >
                            <label className='font-semibold text-xl '>Vehicle Breakdown Time
                            </label>
                            <Controller
                                name="veh_break_time"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder="Enter Vehicle breakdown Time"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                        variant='filled'
                                    />
                                )}
                            />
                        </Box>
                    </Box>
                    <div className='flex justify-center w-full mt-10'>
                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </div>
                </Box>
            </LocalizationProvider>

        </Box>
    )
}

export default CrusherWeightmentForm;