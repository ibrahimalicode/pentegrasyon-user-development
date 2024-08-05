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

export function formatPhoneNumber(inputValue, cursorPosition) {
  let input = inputValue.replace(/\D/g, "").substring(0, 11);

  if (input[0] !== "0") {
    input = "0" + input;
  }

  const size = input.length;
  let formattedNumber;
  if (size === 0) {
    formattedNumber = input;
  } else if (size < 5) {
    formattedNumber = input;
  } else if (size < 8) {
    formattedNumber = `${input.slice(0, 4)} ${input.slice(4, 7)}`;
  } else if (size < 10) {
    formattedNumber = `${input.slice(0, 4)} ${input.slice(4, 7)} ${input.slice(
      7,
      9
    )}`;
  } else {
    formattedNumber = `${input.slice(0, 4)} ${input.slice(4, 7)} ${input.slice(
      7,
      9
    )} ${input.slice(9, 11)}`;
  }

  let newCursorPosition = cursorPosition;

  // Adjust cursor position if needed
  if (cursorPosition > 4 && cursorPosition <= 7) {
    newCursorPosition += 1;
  } else if (cursorPosition > 7 && cursorPosition <= 9) {
    newCursorPosition += 2;
  } else if (cursorPosition > 9) {
    newCursorPosition += 3;
  }

  // Additional adjustment for deletions
  if (inputValue.length > formattedNumber.length) {
    if (cursorPosition === 5 || cursorPosition === 8 || cursorPosition === 11) {
      newCursorPosition -= 1;
    }
  }

  return { formattedNumber, newCursorPosition };
}

export function spacePhoneNumber(phoneNumber) {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");

  const match = cleaned.match(/^(\d{4})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
  }

  return phoneNumber;
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
