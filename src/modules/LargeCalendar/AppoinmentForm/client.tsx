import { IoIosArrowDown } from "react-icons/io";

const clients = ['John', 'Marry', 'Jane', 'Robert']

export const Client = (
    <>
        <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="appointment-form-client"
        >
            Client
        </label>
        <div className='relative mb-3'>
            <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="appointment-form-client"
                name="client"
            >
                {clients.map((client, index) => <option key={index}>{client}</option>)}
            </select>
            <IoIosArrowDown className='absolute right-[1.25rem] top-0 bottom-0 m-auto' />
        </div>
    </>
)