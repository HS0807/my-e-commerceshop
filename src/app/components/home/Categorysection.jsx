
import Link from 'next/link'
import React from 'react'
import Image from 'next/image';

export default async function Categorysection() {

  return (
    <section className="py-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#803f14] font-serif text-center mb-6">Shop By Category</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-10      ">


          {/* category 1 */}
          <div className="flex flex-col items-center justify-center shadow-md hover:shadow-2xl rounded-2xl transition-transform duration-400 hover:-translate-y-2 overflow-hidden ">
            <Image
              src="/assets/category1.png"
              alt="Men"
              width={500}
              height={500}
              className="w-full h-72 object-cover rounded-lg"
            />
            <div className='p-5'>
              <h2 className='font-medium text-base sm:text-lg uppercase '>Men</h2>
              <Link href="/shop">
                <div className="text-sm text-gray-500 hover:text-black transition-colors duration-300">Shop Now →
                </div> </Link>
            </div>
          </div>

          {/* category 2 */}
          <div className="flex flex-col items-center justify-center shadow-md hover:shadow-2xl rounded-2xl transition-transform duration-400 hover:-translate-y-2 overflow-hidden ">
            <Image
              src="/assets/category2.png"
              alt="Women"
              width={500}
              height={500}
              className="w-full h-72 object-cover rounded-lg"
            />
            <div className='p-5'>
              <h2 className='font-medium text-base sm:text-lg uppercase'>Women</h2>
              <Link href="/shop">
                <div className="text-sm text-gray-500 hover:text-black transition-colors duration-300">Shop Now →
                </div> </Link>
            </div>
          </div>

          {/* category 3 */}
          <div className="flex flex-col items-center justify-center shadow-md hover:shadow-2xl rounded-2xl transition-transform duration-400 hover:-translate-y-2 overflow-hidden ">
            <Image
              src="/assets/category3.png"
              alt="Accessories"
              width={500}
              height={500}
              className="w-full h-72 object-cover rounded-lg"
            />
            <div className='p-5'>
              <h2 className='font-medium text-base sm:text-lg uppercase'>Accessories</h2>
              <Link href="/shop">
                <div className="text-sm text-gray-500 hover:text-black transition-colors duration-300">Shop Now →
                </div> </Link>
            </div>
          </div>

          {/* category 4 */}
          <div className="flex flex-col items-center justify-center shadow-md hover:shadow-2xl rounded-2xl transition-transform hover:-translate-y-2 overflow-hidden ">
            <Image
              src="/assets/category4.png"
              alt="Shoes"
              width={500}
              height={500}
              className="w-full h-72 object-cover rounded-lg"
            />
            <div className='p-5'>
              <h2 className='font-medium text-base sm:text-lg uppercase'>Shoes</h2>
              <Link href="/shop">
                <div className="text-sm text-gray-500 hover:text-black transition-colors duration-300">Shop Now →
                </div> </Link>
            </div>
          </div>

          {/* category 5 */}
          <div className="flex flex-col items-center justify-center shadow-md hover:shadow-2xl rounded-2xl transition-transform duration-400 hover:-translate-y-2 overflow-hidden ">
            <Image
              src="/assets/category5.png"
              alt="Watches"
              width={500}
              height={500}
              className="w-full h-72 object-cover rounded-lg"
            />
            <div className='p-5'>
              <h2 className='font-medium text-base sm:text-lg uppercase'>Watches</h2>
              <Link href="/shop">
                <div className="text-sm text-gray-500 hover:text-black transition-colors duration-300">Shop Now →
                </div> </Link>
            </div>
          </div>

          {/* category 6 */}
          <div className="flex flex-col items-center justify-center shadow-md hover:shadow-2xl rounded-2xl transition-transform duration-400 hover:-translate-y-2 overflow-hidden ">
            <Image
              src="/assets/category6.png"
              alt="Perfumes"
              width={500}
              height={500}
              className="w-full h-72 object-cover rounded-lg"
            />
            <div className='p-5'>
              <h2 className='font-medium text-base sm:text-lg uppercase'>Perfumes</h2>
              <Link href="/shop">
                <div className="text-sm text-gray-500 hover:text-black transition-colors duration-300">Shop Now →
                </div> </Link>
            </div>
          </div>

        </div>
      </div>
    </section >
  )
}
