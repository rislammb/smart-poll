export const validate = (creator, title, description, newOptions) => {
  let errors = {};
  if (creator.trim().length < 3) {
    errors.creator = 'Creator name at least 3 charecters long';
  }
  if (title.trim().length < 5) {
    errors.title = 'Poll title at least 5 charecters long';
  }

  const { errors2 } = validateDesOpt(description, newOptions);
  errors = { ...errors, ...errors2 };
  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};

export const validateDesOpt = (description, newOptions) => {
  let errors2 = {};
  if (description.trim().length < 7) {
    errors2.description = 'Poll description at least 7 charecters long';
  }
  if (newOptions.length < 2) {
    errors2.options = 'At least two poll option must not be empty';
  } else if (newOptions[0].name.trim() === newOptions[1].name.trim()) {
    errors2.options = 'Poll options must not be same';
  }
  if (
    newOptions[2] &&
    newOptions[0].name.trim() === newOptions[2].name.trim()
  ) {
    errors2.options = 'Poll options must not be same';
  }
  if (
    newOptions[3] &&
    newOptions[0].name.trim() === newOptions[3].name.trim()
  ) {
    errors2.options = 'Poll options must not be same';
  }
  if (
    newOptions[4] &&
    newOptions[0].name.trim() === newOptions[4].name.trim()
  ) {
    errors2.options = 'Poll options must not be same';
  }
  return { errors2, valid: Object.keys(errors2).length === 0 };
};
