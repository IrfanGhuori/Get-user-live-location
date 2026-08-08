import React, { useEffect, useState } from 'react';

const initialLocation = {
  country: '',
  state: '',
  city: '',
  area: '',
  postcode: '',
  address: '',
  latitude: '',
  longitude: '',
};

function ReactLiveLocation() {
  const [location, setLocation] = useState(initialLocation);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setMessage('Geolocation is not supported by this browser.');
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
            {
              headers: {
                Accept: 'application/json',
              },
            }
          );

          if (!response.ok) {
            throw new Error('Failed to get address');
          }

          const data = await response.json();
          const address = data.address || {};

          setLocation({
            country: address.country || '',
            state: address.state || '',
            city: address.city || address.town || address.village || address.municipality || '',
            area: address.suburb || address.neighbourhood || address.quarter || address.city_district || '',
            postcode: address.postcode || '',
            address: data.display_name || '',
            latitude: lat.toString(),
            longitude: lon.toString(),
          });
        } catch (error) {
          console.error('Reverse geocoding error:', error);
          setMessage('Unable to fetch address details.');
        }
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setMessage('User denied location permission.');
            break;
          case error.POSITION_UNAVAILABLE:
            setMessage('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setMessage('Location request timed out.');
            break;
          default:
            setMessage('An unknown location error occurred.');
        }
      },
      options
    );
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocation((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ maxWidth: '480px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Get User Live Location in React</h1>

      {message && <p style={{ color: 'red' }}>{message}</p>}

      <div style={{ marginBottom: '16px', padding: '12px', border: '1px solid #ddd' }}>
        <strong>Location</strong>
        <br />
        Country: {location.country || '—'}
        <br />
        State: {location.state || '—'}
        <br />
        City: {location.city || '—'}
        <br />
        Area: {location.area || '—'}
        <br />
        Postcode: {location.postcode || '—'}
        <br />
        Address: {location.address || '—'}
      </div>

      <form>
        <div style={{ marginBottom: '8px' }}>
          <input type="text" name="country" value={location.country} onChange={handleChange} placeholder="Country" style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <input type="text" name="state" value={location.state} onChange={handleChange} placeholder="State" style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <input type="text" name="city" value={location.city} onChange={handleChange} placeholder="City" style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <input type="text" name="area" value={location.area} onChange={handleChange} placeholder="Area" style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <input type="text" name="postcode" value={location.postcode} onChange={handleChange} placeholder="Postcode" style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <input type="text" name="address" value={location.address} onChange={handleChange} placeholder="Full Address" style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <input type="text" name="latitude" value={location.latitude} onChange={handleChange} placeholder="Latitude" style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <input type="text" name="longitude" value={location.longitude} onChange={handleChange} placeholder="Longitude" style={{ width: '100%', padding: '8px' }} />
        </div>
      </form>
    </div>
  );
}

export default ReactLiveLocation;
