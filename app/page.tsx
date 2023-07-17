"use client";

import { useState, useEffect } from 'react';

import { Hero, SearchBar, CustomFilter, CarCard, ShowMore } from '@/components'
import { fetchCars } from '@/utils';
import { fuels, yearsOfProduction } from '@/constants';
import Image from 'next/image';

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // search states
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');

  // filter states
  const [fuel, setFuel] = useState('');
  const [year, setYear] = useState(2022);

  // pagination states
  const [limit, setLimit] = useState(10);
  
  const getCars = async () => {
    setLoading(true);
    try{
      const result = await fetchCars({
        manufacturer: manufacturer || '',
        model: model || '',
        fuel: fuel || '',
        year: year || 2022,
        limit: limit || 10,
      });
  
      setAllCars(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCars();
  }, [manufacturer, model, fuel, year, limit]);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>
            Car Catalouge
          </h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} setFilter={setFuel} />
            <CustomFilter title='year' options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>
        
        {allCars.length > 0 ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            {loading && (
              <div className='mt-16 w-full flex-center'>
                <Image
                  src='/loader.svg'
                  alt='loader'
                  width={50}
                  height={50}
                  className='object-contain'
                />
              </div>
            )}

            <ShowMore 
              pageNumber={limit /10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>
              Oops, no results
            </h2>
            <p>{allCars?.message}</p>
          </div>
        )}

      </div>
    </main>
  )
}
