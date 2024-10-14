import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form"

interface FormRowProps {
    fieldname1: string,
    fieldname2: string,
    control: any,
    label1: string,
    label2: string,
    inputType1: string,
    inputType2: string
    placeholder1?: string,
    placeholder2?: string,
    optional1?: boolean,
    optional2?: boolean,
    needTopMargin?: boolean,
}

export default function FormRow({fieldname1, fieldname2, control, label1, label2,  inputType1, inputType2, placeholder1, placeholder2, needTopMargin=true, optional1=false, optional2=false}: FormRowProps) {
    return (
        <div className={`formRow ${needTopMargin && "mt-6"}`}>
            <FormField
            control={control}
            name={fieldname1}
            render={({ field }) => (
                <FormItem className="formContainer">
                <FormLabel className="formLabel"> 
                {label1}
               {!optional1 && <span className="astrics"> * </span>}
                </FormLabel>
                <FormControl>
                    <input type={inputType1} placeholder={placeholder1} className="formInput" {...field}/> 
                </FormControl>
                <FormMessage className='text-sm text-red-500' />
                </FormItem>
            )}
            />
            <FormField
            control={control}
            name={fieldname2}
            render={({ field }) => (
                <FormItem className="formContainer">
                <FormLabel className="formLabel"> 
                {label2}
                {!optional2 && <span className="astrics"> * </span>}
                </FormLabel>
                <FormControl>
                    <input type={inputType2} placeholder={placeholder2}  className="formInput" {...field}/> 
                </FormControl>
                <FormMessage  className='text-sm text-red-500' />
                </FormItem>
            )}
            />
        </div>
    )
}
