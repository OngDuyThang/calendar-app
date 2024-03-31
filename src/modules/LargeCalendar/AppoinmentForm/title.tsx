export const Title = (
    <>
        <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="appointment-form-title"
        >
            Title
        </label>
        <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="appointment-form-title"
            type="text"
            placeholder="enter title"
            name="title"
        />
    </>
)