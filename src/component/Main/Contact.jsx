import React from 'react'

function Contact() {
  return (
<>

<section className='py-12'>
<div class="container my-12 mx-auto px-2 md:px-4">

<section class="mb-32">

    <div class="flex justify-center">
        <div class="text-center md:max-w-xl lg:max-w-3xl">
            <h2 class="mb-12 px-6 text-3xl font-bold">
     Bizimlə Əlaqə
            </h2>
        </div>
    </div>

    <div class="flex flex-wrap">

        <form class="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">

            <div class="mb-3 w-full">
                <label class="block font-medium mb-[2px] text-teal-700" htmlFor="exampleInput90">
                        Ad:
                </label>
                <input type="text" class="px-2 py-2 border w-full outline-none rounded-md" id="exampleInput90" placeholder="Ad" />
            </div>

            <div class="mb-3 w-full">
                <label class="block font-medium mb-[2px] text-teal-700" htmlFor="exampleInput90">
                        Email
                </label>
                <input type="email" class="px-2 py-2 border w-full outline-none rounded-md" id="exampleInput90"
                        placeholder="E-poçt ünvanınız" />
            </div>

            <div class="mb-3 w-full">
                <label class="block font-medium mb-[2px] text-teal-700" htmlFor="exampleInput90">
                        Mesaj
                </label>
                <textarea class="px-2 py-2 border rounded-[5px] w-full outline-none" name="" id=""></textarea>
            </div>

            <button type="button"
                    class="mb-6 inline-block w-full rounded bg-teal-400 px-6 py-2.5 font-medium uppercase leading-normal text-white hover:shadow-md hover:bg-teal-500">
                    Göndər
            </button>

        </form>

        <div class="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
        <div class="flex flex-wrap">

  <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
    <div class="flex items-start">
      <div class="shrink-0">
        <div class="inline-block rounded-md bg-yellow-200 p-4 text-yellow-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="2" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
          </svg>
        </div>
      </div>
      <div class="ml-6 grow">
        <p class="mb-2 font-bold text-brown-800">Texniki problem</p>
        <p class="text-neutral-600">support@example.com</p>
        <p class="text-neutral-600">+1 234-567-89</p>
      </div>
    </div>
  </div>


  <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
    <div class="flex items-start">
      <div class="shrink-0">
        <div class="inline-block rounded-md bg-green-200 p-4 text-green-800">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-6 w-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 10-8 0v4m-2 0a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2zm4-4v4" />
</svg>

        </div>
      </div>
      <div class="ml-6 grow">
        <p class="mb-2 font-bold text-brown-800">Məhsullar Haqqında Sorğular</p>
        <p class="text-neutral-600">sales@example.com</p>
        <p class="text-neutral-600">+1 234-567-89</p>
      </div>
    </div>
  </div>


  <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
    <div class="flex items-start">
      <div class="shrink-0">
        <div class="inline-block rounded-md bg-blue-200 p-4 text-blue-800">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-6 w-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A2 2 0 0122 9.553v4.894a2 2 0 01-2.447 1.829L15 14M4 6h16M4 10h16m-7 8H4m6-4H4m14-5v10a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h10a2 2 0 012 2z" />
</svg>
        </div>
      </div>
      <div class="ml-6 grow">
        <p class="mb-2 font-bold text-brown-800">Kampaniyalar və Xəbərlər</p>
        <p class="text-neutral-600">press@example.com</p>
        <p class="text-neutral-600">+1 234-567-89</p>
      </div>
    </div>
  </div>
</div>

        </div>

    </div>
</section>
</div>
</section>
</>
  )
}

export default Contact