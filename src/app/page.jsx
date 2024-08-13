
import react from 'react';
import Link from 'next/link';

const HomePage = () => {

  return (
    <div className='bg-black mt'>
      <h2 className='text-sky-200'>Youtube</h2>
      <div className=''>
        <Link href="/upload" className='text-sky-200'>
          Go To Upload Form
        </Link>
      </div>
    </div>
  )
}

export default HomePage;
