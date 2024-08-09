export function formatDateString(dateString, joint = "/") {
  const date = new Date(dateString);

  // Extract the month, day, and year
  const month = date.getMonth() + 1; // getMonth() returns 0-based month
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2); // Get the last 2 digits of the year

  const formattedDate = `${month}${joint}${day}${joint}${year}`;
  return formattedDate;
}

export const maxInput = (e) => {
  const value = e.target.value;
  const useVal = e.target.value.replace(/[^\d]/g, "");
  const maxAllowed = e.target?.maxLength;

  if (!maxAllowed) {
    return value;
  }

  if (useVal.length > maxAllowed) {
    return value.slice(0, maxAllowed);
  }
  //console.log(value);
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

export const formatSelectorData = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  let sortedData;

  const dataCopy = [...data];

  if (data[0]?.name) {
    sortedData = dataCopy.sort((a, b) => a.name.localeCompare(b.name, "tr"));
  } else if (data[0]?.fullName) {
    sortedData = dataCopy.sort((a, b) =>
      a.fullName.localeCompare(b.fullName, "tr")
    );
  }

  const outData = sortedData.map((ent) => {
    return {
      value: ent.id,
      label: ent?.name ? ent.name : ent?.fullName + " " + ent?.phoneNumber,
      id: ent.id,
    };
  });
  return outData;
};

export function googleMap(lat, lng, setLat, setLng, zoom = 25) {
  const position = {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom,
    center: position,
    mapId: "VITE_PENTEGRASYON_MAP_ID",
  });

  map.addListener("click", (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    return setLat(lat.toFixed(6)), setLng(lng.toFixed(6));
  });
}
