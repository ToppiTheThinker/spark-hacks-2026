import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col h-screen font-sans background3">
      <div className="flex flex-1 overflow-hidden">
        {/* sidebar for AI */}
        <div className="w-1/3 flex items-center justify-center rounded-3xl overflow-hidden p-6 m-6" style={{ backgroundColor: '#EEE2DF' }}></div>
        <div className="flex flex-1 pr-8 m-6">
          {/* white sidebar for desktop */}
          <main className="flex flex-1 flex-col items-center justify-between py-8 px-8 bg-white rounded-3xl dark:bg-white sm:items-start">
            <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
              <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                Our game idk.
              </h1>
            </div>
            <Image src="/desktop1.png" alt="desktop" className="flex-1 object-cover" width={800} height={600} style={{ transform: 'scale(1.2)' }} />
          </main>
        </div>
      </div>
      
      {/* News box at the bottom */}
      <div className="mx-6 mb-6 p-6 bg-white rounded-3xl">
        <p className="text-black text-lg">the news</p>
      </div>
    </div>
  );
}