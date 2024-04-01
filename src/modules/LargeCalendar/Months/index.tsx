import { TGlobalMonthYear } from 'modules/CalendarApp';
import { type FC } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { COLOR, months } from 'utils/constants'

interface IProps {
    globalMonthYear: TGlobalMonthYear;
    setGlobalMonthYear: (value: TGlobalMonthYear) => void;
}

const Months: FC<IProps> = ({
    globalMonthYear,
    setGlobalMonthYear
}) => {
    return (
        <div className='relative'>
            <select
                className="block appearance-none w-full text-white py-2 px-4 pr-8 rounded-xl leading-tight focus:outline-none"
                style={{ background: COLOR.LIGHT_BLUE }}
                id="appointment-form-client"
                name="client"
                onChange={(e) => setGlobalMonthYear({
                    month: months.indexOf(e.target.value),
                    year: globalMonthYear.year
                })}
            >
                {months.map((month, index) => <option key={index}>{month}</option>)}
            </select>
            <IoIosArrowDown className='absolute right-[1rem] top-0 bottom-0 m-auto text-white' />
        </div>
    )
}

export default Months
