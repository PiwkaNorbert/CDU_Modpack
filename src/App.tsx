import { useState } from 'react';
import { data } from './data'
import './index.css'

function App() {

  const [scroll, setScroll] = useState(false);

  const changeColor = () => {
    window.scrollY >= 150 ? setScroll(true) : setScroll(false);

  };
  window.addEventListener("scroll", changeColor);


  return (
      <main className=' grid justify-center items-center  text-bkg-100 font-Tilt bg-gray-300'>
        <header className='grid justify-center  items-center  w-full relative  '>
          <div className='h-[150px] relative '>

            <img src="public/headerbg.png" alt="random" className='object-center object-none  h-full w-screen' />
            <img src="public/logo.png" alt="random" className=' ml-96  w-[150px] h-[139px] absolute top-0 '  />

          </div>

        </header>
            <nav className={` w-full bg-bkg-600 flex  justify-end pt-4 px-2 sticky top-0 z-20  ${scroll === true ? "  bg-bkg-600  shadow-header " : ""}`}>
            <button className='bg-[#22B14C] px-3 py-1 mr-auto  rounded-md text-content h-10'>
                Add Modpack
              </button>
              <button className=' flex items-center gap-2 px-3 py-1 rounded-md text-content h-10 hover:bg-hover-1 '>
                  <svg  xmlns="http://www.w3.org/2000/svg" className='w-6 text-[#7289DA]' viewBox="0 0 640 512" fill="currentColor">
                    <path  d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"/>
                  </svg>
                  Log in / Register
              </button>

            </nav>
        <div className='grid justify-center self-center h-[1000px] '>
          <div className='border-4  border-black bg-bkg-100 rounded-xl my-2 overflow-hidden'>

            <div className='flex space-x-6 items-center justify-center h-fit'>
             
            </div>
            {/* map the data variable in a grad 4x2  */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  '> 
            {data.map((item, index) => (
              <div key={index} className={`flex text-bkg-0 flex-col justify-center items-center bg-${item.color} rounded-md m-4 p-4`}>
                <img src={item.imgSrc} alt="random" className='w-20 h-20' />
                <p className='text-content text-center'>{item.text}</p>
                
              </div>))}
              
            </div>
            </div>

        </div> 
        <div className=" flex justify-end mb-6 p-body-inner mx-4
        ">

        <div className="text-bkg-0 bg-bkg-100 shadow-header w-fit rounded-lg px-2 py-1 ">
				
					<a href="/login/" className="text-sm" data-xf-click="overlay"><span className="button-text">
						You must log in or register to vote.
					</span></a>
				
			</div>
        </div>
        <Footer />
       </main>
  )
}

export default App



export const Footer = () => {
  return (
    <footer className="bg-bkg-600 text-bgk-100 text-sm border-t-4 border-bkg-200  " id="footer">
	<div className="p-footer-inner">

		<div className="p-footer-row">
			
			
			
			<div className="p-footer-row-opposite ">

				<ul className="flex justify-end items-center gap-4 flex-wrap text-bkg-100  px-4 pb-3 pt-2">
						
						<li><a className='hover:bg-hover-2 px-1 py-0.5 rounded-sm' href="/misc/contact" data-xf-click="overlay">Contact us</a></li>
						<li><a className='hover:bg-hover-2 px-1 py-0.5 rounded-sm' href="/help/terms/">Terms and rules</a></li>
						<li><a className='hover:bg-hover-2 px-1 py-0.5 rounded-sm' href="/help/privacy-policy/">Privacy policy</a></li>
						<li><a className='hover:bg-hover-2 px-1 py-0.5 rounded-sm' href="/help/">Help</a></li>
						<li><a className='hover:bg-hover-2 px-1 py-0.5 rounded-sm' href="https://forum.playcdu.co">Home</a></li>
            <li>
              <button className='hover:bg-hover-2 px-1 py-0.5 rounded-sm bg-white ' href="/forums/-/index.rss" target="_blank"  >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='fill-[#ffa500]  w-4 h-4  '>
                  <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM96 136c0-13.3 10.7-24 24-24c137 0 248 111 248 248c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-110.5-89.5-200-200-200c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24c83.9 0 152 68.1 152 152c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-57.4-46.6-104-104-104c-13.3 0-24-10.7-24-24zm0 120a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
                  </svg>
                </button>
              </li>
				</ul>
			</div>
		</div>

		

		
	</div>
</footer>
  )
}