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

export const formatPhoneNumber = (e) => {
  let value = e.target.value;

  if (value[0] !== "0") {
    value = "0" + value;
  }

  // Allow only numbers
  const useVal = value.replace(/[^\d]/g, "");
  const maxAllowed = e.target.maxLength;

  if (maxAllowed && useVal.length > maxAllowed) {
    return useVal.slice(0, maxAllowed);
  }

  return useVal;
};

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
