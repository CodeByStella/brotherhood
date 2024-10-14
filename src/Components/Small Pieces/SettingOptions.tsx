import { Profile_Setting_State, Public_Setting_State } from "../Main/Settings"
import { Checkbox } from "../ui/checkbox"

interface SettingOptions {
    settings: {title: string, options: string[], value: string}[]
    handleClick: ({title, value}: {title: string, value: string}) => void
    data: Profile_Setting_State | Public_Setting_State
}

export default function SettingOptions({settings, data, handleClick} : SettingOptions) {
    return (
        <div className="flex flex-wrap items-start justify-between max-sm:gap-10 sm:gap-14 md:gap-20 mt-7">
            {settings.map((setting) => {
                return (
                    <div key={setting.value} className="mt-5">
                        <h3 className="text-base text-black font-semibold font-palanquin"> {setting.title} : </h3>
                        <div className="mt-6">
                            {setting.options.map((option, index) => {
                                return (
                                    <div key={index} className="flex items-center justify-between gap-7 mt-2.5">
                                        <p > {option} </p>
                                        <Checkbox checked={data[setting.value] === option} onClick={() => handleClick({title: setting.value, value: option})} className="w-4 h-4 rounded-full" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
