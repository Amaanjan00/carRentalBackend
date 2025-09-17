'use client'
import { usePathname } from "next/navigation";

export default function Sidebar() {

    const pathname = usePathname()
    
    const handleClick = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    };

  return (
    <div className="flex flex-col bg-white h-full rounded-2xl shadow-2xl p-2 gap-5">

      <div className="px-4 py-2">
        <img src="/wollogo.png" alt="" />
      </div>

      <nav className="flex flex-col gap-10 px-2">

        <div className="flex flex-col gap-2 bg-white shadow-md p-2 rounded-2xl">
            <h2 className="text-blue-400 rounded-md px-2 font-bold">Dashboards</h2>
            <ul className="p-1">
                <a onClick={handleClick} href="/"><li className={`${pathname === "/" ? "text-[14px] bg-blue-100 rounded-[7px] mb-1 px-1" : "px-1 rounded-[7px] text-[14px] hover:bg-blue-100 mb-1"}`}>Home</li></a>
                <a onClick={handleClick} href="/cars"><li className={`${pathname === "/cars" ? "text-[14px] bg-blue-100 rounded-[7px] mb-1 px-1" : "px-1 rounded-[7px] text-[14px] hover:bg-blue-100 mb-1"}`}>Cars</li></a>
                <a onClick={handleClick} href="/contracts"><li className={`${pathname === "/contracts" ? "text-[14px] bg-blue-100 rounded-[7px] mb-1 px-1" : "px-1 rounded-[7px] text-[14px] hover:bg-blue-100 mb-1"}`}>Contracts</li></a>
                <a onClick={handleClick} href="/customers"><li className={`${pathname === "/customers" ? "text-[14px] bg-blue-100 rounded-[7px] mb-1 px-1" : "px-1 rounded-[7px] text-[14px] hover:bg-blue-100 mb-1"}`}>Customers</li></a>
                <a onClick={handleClick} href="/bills-received"><li className={`${pathname === "/bills-received" ? "text-[14px] bg-blue-100 rounded-[7px] mb-1 px-1" : "px-1 rounded-[7px] text-[14px] hover:bg-blue-100 mb-1"}`}>Bills Received</li></a>
                <a onClick={handleClick} href="/expenses"><li className={`${pathname === "/expenses" ? "text-[14px] bg-blue-100 rounded-[7px] mb-1 px-1" : "px-1 rounded-[7px] text-[14px] hover:bg-blue-100 mb-1"}`}>Expenses</li></a>
            </ul>
        </div>


        <div className="flex flex-col gap-2 bg-white shadow-md p-2 rounded-2xl">
            <h2 className="text-blue-400 rounded-md px-2 font-bold">Forms</h2>
            <ul className="p-1">
                <a onClick={handleClick} href="/add-new-car"><li className={`${pathname === "/add-new-car" ? "text-[14px] bg-blue-100 rounded-[7px] mb-1 px-1" : "px-1 rounded-[7px] text-[14px] hover:bg-blue-100 mb-1"}`}>Add new car</li></a>
                <a onClick={handleClick} href="/contract-form"><li className={`${pathname === "/contract-form" ? "text-[14px] bg-blue-100 rounded-[7px] mb-1 px-1" : "px-1 rounded-[7px] text-[14px] hover:bg-blue-100 mb-1"}`}>Contract Form</li></a>
                <a onClick={handleClick} href="/bill-receiving-form"><li className={`${pathname === "/bill-receiving-form" ? "text-[14px] bg-blue-100 rounded-[7px] mb-1 px-1" : "px-1 rounded-[7px] text-[14px] hover:bg-blue-100 mb-1"}`}>Bill Receiving Form</li></a>
                <a onClick={handleClick} href="/fine-entry-form"><li className={`${pathname === "/fine-entry-form" ? "text-[14px] bg-blue-100 rounded-[7px] mb-1 px-1" : "px-1 rounded-[7px] text-[14px] hover:bg-blue-100 mb-1"}`}>Fine Entry Form</li></a>
                <a onClick={handleClick} href="/salik-entry-form"><li className={`${pathname === "/salik-entry-form" ? "text-[14px] bg-blue-100 rounded-[7px] mb-1 px-1" : "px-1 rounded-[7px] text-[14px] hover:bg-blue-100 mb-1"}`}>Salik Entry Form</li></a>
                <a onClick={handleClick} href="/expense-entry-form"><li className={`${pathname === "/expense-entry-form" ? "text-[14px] bg-blue-100 rounded-[7px] mb-1 px-1" : "px-1 rounded-[7px] text-[14px] hover:bg-blue-100 mb-1"}`}>Expense Entry Form</li></a>
            </ul>
        </div>
        
      </nav>
    </div>
  )
}