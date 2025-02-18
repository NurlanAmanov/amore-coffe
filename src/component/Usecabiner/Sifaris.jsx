import React, { useContext } from 'react'
import{ BASKET } from '../../Context/BasketContext'
function Sifaris() {
    const {sebet}=useContext(BASKET)
  return (
    <>
      <div className="overflow-x-auto ">
      <table className="min-w-full ">
        <thead className=" whitespace-nowrap">
          <tr>
            <th className="pl-4 w-8">
              <input id="checkbox" type="checkbox" className="hidden peer" />
              <label htmlhtmlFor="checkbox"
                className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-4 h-4 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-white" viewBox="0 0 520 520">
                  <path
                    d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                    data-name="7-Check" data-original="#000000" />
                </svg>
              </label>
            </th>
            <th className="p-4 text-left text-sm font-semibold text-black">
              Məhsullar
            </th>
            <th className="p-4 text-left text-sm font-semibold text-black">
              Qiymət
            </th>
            <th className="p-4 text-left text-sm font-semibold text-black">
            Miqdar
            </th>
        
            <th className="p-4 text-left text-sm font-semibold text-black">
        Ölçü
            </th>
    
           
          </tr>
        </thead>

        <tbody className="whitespace-nowrap divide-y divide-gray-200">
        {sebet && sebet.map((item, i) => {
  return (
    <tr key={i}>
      {/* Checkbox Column */}
      <td className="pl-4 w-8">
        <input
          id={`checkbox-${i}`}  // Unique ID for each checkbox
          type="checkbox"
          className="hidden peer"
        />
        <label
          htmlFor={`checkbox-${i}`}  // Link checkbox to the label
          className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-4 h-4 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-white" viewBox="0 0 520 520">
            <path
              d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
              data-name="7-Check" data-original="#000000"
            />
          </svg>
        </label>
      </td>

      {/* Product Image and Title */}
      <td className="p-4 text-sm">
        <div className="flex items-center cursor-pointer">
          <img
            src={item.imgUrl}
            alt={item.title}
            className="w-10 h-10 p-1.5 shrink-0 bg-gray-100"
          />
          <div className="mx-4">
            <p className="text-sm text-black">{item.title}</p>
          </div>
        </div>
      </td>

      {/* Price Column */}
      <td className="p-4 text-sm">
        {item.price} ₼
      </td>

      {/* Count Column */}
      <td className="p-4 text-sm">
        {item.count}
      </td>

      {/* Variant Column */}
      <td className="p-4 text-sm">
        {item.selectedVariant || 'Seçilməyib'} {/* Show variant if exists, otherwise show "Not Selected" */}
      </td>
    </tr>
  )
})}

        </tbody>
      </table>

      <div className="md:flex m-4">
        <p className="text-sm text-black flex-1">Showind 1 to 5 of 100 entries</p>
        <div className="flex items-center max-md:mt-4">
          <p className="text-sm text-black">Display</p>

          <select className="text-sm text-black border border-gray-400 rounded h-8 px-1 mx-4 outline-none">
            <option>5</option>
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>

          <ul className="flex space-x-1 ml-4">
            <li className="flex items-center justify-center cursor-pointer bg-gray-200 w-8 h-8 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-500" viewBox="0 0 55.753 55.753">
                <path
                  d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                  data-original="#000000" />
              </svg>
            </li>
            <li className="flex items-center justify-center cursor-pointer text-sm w-8 h-8 rounded">
              1
            </li>
            <li className="flex items-center justify-center cursor-pointer text-sm bg-[#ffff] text-black w-8 h-8 rounded">
              2
            </li>
            <li className="flex items-center justify-center cursor-pointer text-sm w-8 h-8 rounded">
              3
            </li>
            <li className="flex items-center justify-center cursor-pointer text-sm w-8 h-8 rounded">
              4
            </li>
            <li className="flex items-center justify-center cursor-pointer bg-gray-200 w-8 h-8 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-500 rotate-180" viewBox="0 0 55.753 55.753">
                <path
                  d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                  data-original="#000000" />
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}

export default Sifaris
