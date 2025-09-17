
export default function Home() {
  return (
    <>
      <div className="flex flex-col w-full h-full items-center justify-center gap-10">

        <div className="text-3xl font-bold">
          Welcome to Wheels on Luxury Car rental L.L.C Dashboard
        </div>

        <div className="flex gap-4">

          <a href="/contracts"><div className="w-fit p-4 bg-blue-400 text-4xl font-extrabold text-white">
            <p>Contracts</p>
          </div></a>

          <a href="/customers"><div className="w-fit p-4 bg-red-400 text-4xl font-extrabold text-white">
            <p>Customers</p>
          </div></a>

          <a href="/bills-received"><div className="w-fit p-4 bg-green-400 text-4xl font-extrabold text-white">
            <p>Bills Received</p>
          </div></a>

          <a href="/cars"><div className="w-fit p-4 bg-amber-400 text-4xl font-extrabold text-white">
            <p>Cars</p>
          </div></a>

        </div>
      </div>
    </>
  );
}
