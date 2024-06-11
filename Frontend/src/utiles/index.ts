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
  let errors: any = undefined;
  Object.keys(data).forEach((field) => {
    if (
      !(data as any)[field] ||
      (data as any)[field] == "" ||
      (data as any)[field] == 0
    ) {
      if (!errors) errors = {};
      errors[field] = `Campo requerido`;
      return;
    }
    if (customValid && customValid[field]) {
      if (!errors) errors = {};
      const status = customValid[field].valid((data as any)[field]);
      if (!status) errors[field] = customValid[field].error;
    }
  });
  return errors;
};

export const validateField = (data: any, name: string) => {
  if (data == undefined) {
    return undefined;
  }
  return data[name] || undefined;
};
