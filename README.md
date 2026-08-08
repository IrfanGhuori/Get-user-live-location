![Alt text](/img/image-2.png)

# 📍 Browser Location to Form Inputs

A lightweight browser location utility that gets the user's current position, reverse geocodes it through **OpenStreetMap Nominatim**, fills address details into HTML form fields, and exposes a live **Google Maps** link for the detected location.

## ✨ Features

* 📍 Detect the user's current GPS coordinates
* 🌎 Convert coordinates into address fields using Nominatim
* 🏠 Fill form inputs for country, state, city, area, postcode, and full address
* 🌐 Store latitude and longitude values alongside the address
* 🔗 Generate a Google Maps link for the current location
* 🔑 No API key required for Nominatim reverse geocoding
* 💻 Pure JavaScript — no framework required
* 🔗 Includes a button that generates a Google Maps link for the current location

## 🚀 Demo

The script uses the browser's built-in Geolocation API:

```javascript
navigator.geolocation.getCurrentPosition()
```

The coordinates are then sent to OpenStreetMap Nominatim:

```text
https://nominatim.openstreetmap.org/reverse
```

The returned address is automatically inserted into the form.

The page also includes a Google Maps link that uses the detected latitude and longitude to open the user's current position in Google Maps.

## 📂 Project Structure

```text
location-form/
│
├── index.html
├── src/
│   ├── map.js
│   ├── reactMap.jsx
│   └── ReactAppExample.jsx
└── README.md
```

## 🛠️ How It Works

The process is simple:

```text
User opens website
        ↓
Browser requests location permission
        ↓
Browser returns latitude & longitude
        ↓
Coordinates are sent to Nominatim
        ↓
Nominatim returns address information
        ↓
JavaScript fills the form inputs
```

## 💻 Example Form

```html
<form>

    <input type="text" id="country" name="country" placeholder="Country">

    <input type="text" id="state" name="state" placeholder="State">

    <input type="text" id="city" name="city" placeholder="City">

    <input type="text" id="area" name="area" placeholder="Area">

    <input type="text" id="postcode" name="postcode" placeholder="Postcode">

    <input type="text" id="address" name="address" placeholder="Full Address">

    <input type="hidden" id="latitude" name="latitude">

    <input type="hidden" id="longitude" name="longitude">

    <button type="submit">Submit</button>

</form>
```

## ⚛️ React Version

A React-friendly version is also included in the project:

- [src/reactMap.jsx](src/reactMap.jsx) — the React component that requests the user's location and fills the form-like fields
- [src/ReactAppExample.jsx](src/ReactAppExample.jsx) — a simple example export for rendering the component

Example usage:

```jsx
import ReactLiveLocation from './reactMap';

function App() {
  return <ReactLiveLocation />;
}
```

This version uses the same geolocation and reverse geocoding flow as the plain JavaScript version, but it runs inside a React component.

## If you want to save the location in Laravel
Since you're using Laravel, you can send the coordinates/address to your Laravel controller with AJAX:

```JavaScript

fetch("/save-location", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
    },
    body: JSON.stringify({
        latitude: lat,
        longitude: lon,
        country: country,
        state: state,
        city: city,
        area: area,
        address: fullAddress
    })
})
.then(response => response.json())
.then(data => {
    console.log(data);
});
```



## 🔐 Browser Permissions

The browser will ask the user for permission to access their location.

The user must select:

**Allow Location Access**

Geolocation generally requires a secure environment.



## 🌐 API

This project uses **OpenStreetMap Nominatim** for reverse geocoding.

Nominatim converts:

```text
Latitude + Longitude
```

into:

```text
Country
State
City
Area
Postcode
Full Address
```

For production applications, review the Nominatim usage policy and avoid sending excessive automated requests.

## ⚠️ Important Notes

### Location accuracy

GPS accuracy depends on the user's:

* Device
* GPS availability
* Wi-Fi/network
* Browser
* Operating system
* Indoor/outdoor environment

The returned address may sometimes represent a nearby locality rather than the user's exact address.

### Privacy

Location data is sensitive information. Only request location when it is necessary, clearly explain why it is being requested, and avoid storing it unless the user understands and agrees.

## 🔧 Customization

You can easily change the form field IDs:

```javascript
document.getElementById("city").value = city;
```

For example:

```javascript
document.getElementById("user_city").value = city;
```

You can also add additional fields such as:

```javascript
address.road
address.house_number
address.postcode
address.country_code
```

## 🧩 Laravel Integration

This project can also be integrated with Laravel.

You can submit the detected information:

```text
latitude
longitude
country
state
city
area
postcode
address
```

to a Laravel controller and store it in your database.

Example database fields:

```text
id
user_id
latitude
longitude
country
state
city
area
postcode
address
created_at
updated_at
```

## 📄 License

This project is free to use and modify for personal and commercial projects.

## ⭐ Contributing

Contributions, improvements, and bug reports are welcome.

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Open a Pull Request

---

### 👨‍💻 Built With

* HTML5
* JavaScript
* Browser Geolocation API
* OpenStreetMap Nominatim API

If this project helped you, consider giving the repository a ⭐.
