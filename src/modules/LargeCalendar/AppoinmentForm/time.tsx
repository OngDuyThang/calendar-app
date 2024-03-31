import { IoIosArrowDown } from "react-icons/io";
import { hours, minutes } from "utils/time";

export const Time = (
    <>
        <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="appointment-form-hour"
                >
                    Hour
                </label>
                <div className="relative">
                    <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="appointment-form-hour"
                        name="hour"
                    >
                        {hours().map((hour, index) => <option key={index}>{hour}</option>)}
                    </select>
                    <IoIosArrowDown className='absolute right-[1.25rem] top-0 bottom-0 m-auto' />
                </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="appointment-form-minutes"
                >
                    Minutes
                </label>
                <div className="relative">
                    <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="appointment-form-minutes"
                        name="minutes"
                    >
                        {minutes().map((minute, index) => <option key={index}>{minute}</option>)}
                    </select>
                    <IoIosArrowDown className='absolute right-[1.25rem] top-0 bottom-0 m-auto' />
                </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="appointment-form-ampm"
                >
                    AM/PM
                </label>
                <div className="relative">
                    <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="appointment-form-ampm"
                        name="ampm"
                    >
                        <option>AM</option>
                        <option>PM</option>
                    </select>
                    <IoIosArrowDown className='absolute right-[1.25rem] top-0 bottom-0 m-auto' />
                </div>
            </div>
        </div>
    </>
)