![Alt text](/img/image-2.png)

# 📍 Browser Location to Form Inputs

A simple JavaScript project that automatically detects the user's **latitude and longitude**, converts the coordinates into a readable address using the **OpenStreetMap Nominatim API**, and fills the location information into HTML form inputs.

## ✨ Features

* 📍 Get the user's current GPS location
* 🌎 Detect country
* 🗺️ Detect state/province
* 🏙️ Detect city/town/village
* 📌 Detect area/neighborhood
* 📮 Detect postcode
* 🏠 Get full address
* 🌐 Get latitude and longitude
* 📝 Automatically fill HTML form inputs
* 🔑 No API key required for basic Nominatim usage
* 💻 Pure JavaScript — no framework required

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

## 📂 Project Structure

```text
location-form/
│
├── index.html
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
