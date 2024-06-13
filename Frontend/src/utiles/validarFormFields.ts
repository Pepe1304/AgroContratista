// interface CustomValid {
//   [fieldName: string]: {
//     valid: (val: any) => boolean;
//     error: string;
//   };
// }

// export const validateForm = (
//   data: any,
//   customValid?: CustomValid
// ): any | undefined => {
//   let errors: any = undefined;
//   Object.keys(data).forEach((field) => {
//     if (
//       !(data as any)[field] ||
//       (data as any)[field] == "" ||
//       (data as any)[field] == 0
//     ) {
//       if (!errors) errors = {};
//       errors[field] = `Campo requerido`;
//       return;
//     }
//     if (customValid && customValid[field]) {
//       if (!errors) errors = {};
//       const status = customValid[field].valid((data as any)[field]);
//       if (!status) errors[field] = customValid[field].error;
//     }
//   });
//   return errors;
// };

// export const validateField = (data: any, name: string) => {
//   if (data == undefined) {
//     return undefined;
//   }
//   return data[name] || undefined;
// };

interface CustomValid {
  [fieldName: string]: {
    valid: (val: any) => boolean;
    error: string;
  };
}

export const validateForm = (
  data: any,
  customValid?: CustomValid
): any | undefined => {
  const errors: any = {};

  // Iterating through each field in the data
  Object.keys(data).forEach((field) => {
    // Check if the field is empty or undefined
    if (data[field] === undefined || data[field] === "" || data[field] === 0) {
      errors[field] = `Campo requerido`;
    } else if (customValid && customValid[field]) {
      // Check custom validation if provided
      const status = customValid[field].valid(data[field]);
      if (!status) {
        errors[field] = customValid[field].error;
      }
    }
  });

  // Check if there are any errors, return undefined if no errors found
  return Object.keys(errors).length === 0 ? undefined : errors;
};

export const validateField = (data: any, name: string) => {
  // Return undefined if data is undefined
  if (data === undefined) {
    return undefined;
  }
  // Return the value of the field if exists, otherwise return undefined
  return data[name];
};
