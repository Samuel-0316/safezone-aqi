import { AirQualityResponse } from '@/lib/meersens_api/AIRQualityTypes';
import React from 'react'

const Map = ({
  lat,
  lon,
  name,
  aqi,
}: {
  lat: number;
  lon: number;
  name: string;
  aqi: AirQualityResponse;
}) => {
  return (
    <div className='text-white'>
        <h1>{name}</h1>
        <p>Latitude: {lat}</p>
        <p>Longitude: {lon}</p>
        <p>Air Quality Index: {aqi.found}</p>
        <p>Components:</p>
        <ul>
            {Object.entries(aqi.pollutants).map(([key, value]) => (
            <li key={key}>
                {value.name}: {value.value}
            </li>
            ))}
        </ul>
    </div>
  )
}

export default Map