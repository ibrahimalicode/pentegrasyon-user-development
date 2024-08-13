import toast from "react-hot-toast";
import MarketPalceIds from "../data/marketPlaceIds";

export function formatDateString(dateString, joint = "/") {
  const date = new Date(dateString);

  // Extract the month, day, and year
  const month = date.getMonth() + 1; // getMonth() returns 0-based month
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2); // Get the last 2 digits of the year

  const formattedDate = `${day}${joint}${month}${joint}${year}`;
  return formattedDate;
}

export function getRemainingDays(endDateTime) {
  const start = new Date();
  const end = new Date(endDateTime);

  // Calculate the difference in milliseconds
  const diff = end - start;

  // Convert milliseconds to days
  const remainingDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return remainingDays;
}

export const maxInput = (e) => {
  const value = e.target.value;
  const useVal = e.target.value.replace(/[^\d]/g, "");
  const maxAllowed = e.target?.maxLength;

  if (!maxAllowed || maxAllowed === -1) {
    return value;
  }

  if (useVal.length > maxAllowed) {
    return value.slice(0, maxAllowed);
  }
  // console.log(value);
  return value;
};

export function spacePhoneNumber(phoneNumber) {
  // console.log(phoneNumber);
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const number = cleaned.replace("9", "");
  // console.log(number);

  const match = number.match(/^(\d{4})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
  }
  return phoneNumber;
}

export function formatEmail(email) {
  const validCharsRegex = /[^\w\d@._-]/g;
  let formattedEmail = email.replace(validCharsRegex, "");
  formattedEmail = formattedEmail.trim().toLowerCase();
  return formattedEmail;
}

export const formatSelectorData = (data, withPhoneNumber = false) => {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  let sortedData;

  const dataCopy = [...data];
  let outData;

  if (data[0]?.name) {
    sortedData = dataCopy.sort((a, b) => a.name.localeCompare(b.name, "tr"));
  } else if (data[0]?.fullName) {
    sortedData = dataCopy.sort((a, b) =>
      a.fullName.localeCompare(b.fullName, "tr")
    );
  }
  if (withPhoneNumber && sortedData[0]?.phoneNumber) {
    outData = sortedData.map((ent) => {
      // console.log(ent.userId);
      return {
        value: ent.id,
        label: (ent?.name ? ent.name : ent?.fullName) + " " + ent?.phoneNumber,
        id: ent.id,
        userId: ent.userId,
      };
    });
  } else {
    outData = sortedData.map((ent) => {
      return {
        value: ent.id,
        label: ent?.name ? ent.name : ent?.fullName + " " + ent?.phoneNumber,
        id: ent.id,
      };
    });
  }
  return outData;
};

export const formatLisansPackages = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }
  function CustomLabel(label, year, price) {
    return `
      <div class="flex justify-between">
        <p class='w-36'>${label}</p>
        <p class='w-20 text-[--link-1]' > | ${year} Yıllık | </p>
        <p class='w-12' >${price}</p>
      </div>`;
  }

  const outData = data.map((ent) => {
    return {
      value: MarketPalceIds[ent.marketplaceId].label,
      label: CustomLabel(
        MarketPalceIds[ent.marketplaceId].label,
        ent.time,
        ent.price
      ),
      id: ent.marketplaceId,
      time: ent.time,
      price: ent.price,
      licensePackageId: ent.id,
    };
  });
  return outData;
};

// let marker = null;
// export function googleMap(lat, lng, setLat, setLng, zoom = 25, bounds) {
//   const position = {
//     lat: parseFloat(lat),
//     lng: parseFloat(lng),
//   };

//   console.log(bounds);
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom,
//     center: position,
//     mapId: "VITE_PENTEGRASYON_MAP_ID",
//   });

//   // Define the allowed bounds (replace with actual boundary coordinates)
//   const allowedBounds = bounds;

//   // Helper function to check if a position is within the allowed bounds
//   function isPositionWithinBounds(lat, lng) {
//     return (
//       lat >= allowedBounds.minLat &&
//       lat <= allowedBounds.maxLat &&
//       lng >= allowedBounds.minLng &&
//       lng <= allowedBounds.maxLng
//     );
//   }

//   // Create a marker when the map initially loads
//   marker = new google.maps.marker.AdvancedMarkerElement({
//     map,
//     position,
//     title: "Uluru",
//     draggable: true,
//   });

//   // Update latitude and longitude state on marker drag end
//   marker.addListener("dragend", (e) => {
//     const newLat = e.latLng.lat();
//     const newLng = e.latLng.lng();

//     if (isPositionWithinBounds(newLat, newLng)) {
//       setLat(newLat.toFixed(6));
//       setLng(newLng.toFixed(6));
//       map.panTo({ lat: newLat, lng: newLng });
//     } else {
//       // If the position is outside the bounds, reset the marker to the previous position
//       marker.setPosition(position);
//       map.panTo({ lat: position.lat, lng: position.lng });
//     }
//   });

//   map.addListener("click", (e) => {
//     const latitude = e.latLng.lat();
//     const longitude = e.latLng.lng();
//     if (isPositionWithinBounds(latitude, longitude)) {
//       if (marker) {
//         marker.setMap(null);
//       }

//       marker = new google.maps.marker.AdvancedMarkerElement({
//         map,
//         position: { lat: latitude, lng: longitude },
//         title: "Uluru",
//         draggable: true,
//       });

//       // Center the map on the new marker's position
//       map.panTo({ lat: latitude, lng: longitude });
//       setLat(latitude.toFixed(6));
//       setLng(longitude.toFixed(6));
//     } else {
//       toast("You cannot place the marker outside the specified boundaries.");
//       console.log(latitude, longitude);
//       console.log(parseFloat(lat), parseFloat(lng));
//       map.panTo({ lat: parseFloat(lat), lng: parseFloat(lng) });
//     }
//   });
// }

let marker = null;

export function googleMap(lat, lng, setLat, setLng, boundaryCoords, zoom = 13) {
  const position = {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom,
    center: position,
    mapId: "VITE_PENTEGRASYON_MAP_ID",
  });

  // Define the boundary polygon
  const boundaryPolygon = new google.maps.Polygon({
    paths: boundaryCoords,
    strokeColor: "#0B8A00",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#E9FFEF",
    fillOpacity: 0.35,
    clickable: false,
  });

  boundaryPolygon.setMap(map);

  // Helper function to check if a position is within the allowed bounds
  function isPositionWithinBounds(lat, lng) {
    const point = new google.maps.LatLng(lat, lng);
    return google.maps.geometry.poly.containsLocation(point, boundaryPolygon);
  }

  // Create a marker when the map initially loads
  marker = new google.maps.marker.AdvancedMarkerElement({
    map,
    position,
    title: "Uluru",
    draggable: true,
  });

  // Update latitude and longitude state on marker drag end
  marker.addListener("dragend", (e) => {
    const newLat = e.latLng.lat();
    const newLng = e.latLng.lng();

    if (isPositionWithinBounds(newLat, newLng)) {
      setLat(newLat.toFixed(6));
      setLng(newLng.toFixed(6));
      map.panTo({ lat: newLat, lng: newLng });
    } else {
      // If the position is outside the bounds, reset the marker to the previous position
      marker.setPosition(position);
      map.panTo({ lat: position.lat, lng: position.lng });
    }
  });

  map.addListener("click", (e) => {
    const latitude = e.latLng.lat();
    const longitude = e.latLng.lng();
    //console.log(latitude, longitude);
    if (isPositionWithinBounds(latitude, longitude)) {
      if (marker) {
        marker.setMap(null);
      }

      marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: latitude, lng: longitude },
        title: "Uluru",
        draggable: true,
      });

      // Center the map on the new marker's position
      map.panTo({ lat: latitude, lng: longitude });
      setLat(latitude.toFixed(6));
      setLng(longitude.toFixed(6));
    } else {
      toast.dismiss();
      toast("Belirlenen alan dışında konum seçemesiniz 😏.");
      map.panTo({ lat: parseFloat(lat), lng: parseFloat(lng) });
    }
  });
}

export function getDateRange(years) {
  const startDateTime = new Date().toISOString();

  const endDate = new Date();
  endDate.setFullYear(endDate.getFullYear() + years);
  const endDateTime = endDate.toISOString();

  return {
    startDateTime,
    endDateTime,
  };
}
