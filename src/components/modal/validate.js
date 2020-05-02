export const validate = (title, description, newOptions) => {
  let errors = {};
  if (title.trim().length < 5) {
    errors.title = 'Poll title at least 5 charecters long';
  }
  if (description.trim().length < 7) {
    errors.description = 'Poll description at least 7 charecters long';
  }
  if (newOptions.length < 2) {
    errors.options = 'At least two poll option must not be empty';
  } else if (newOptions[0].name.trim() === newOptions[1].name.trim()) {
    errors.options = 'Poll options must not be same';
  }
  if (
    newOptions[2] &&
    newOptions[0].name.trim() === newOptions[2].name.trim()
  ) {
    errors.options = 'Poll options must not be same';
  }
  if (
    newOptions[3] &&
    newOptions[0].name.trim() === newOptions[3].name.trim()
  ) {
    errors.options = 'Poll options must not be same';
  }
  if (
    newOptions[4] &&
    newOptions[0].name.trim() === newOptions[4].name.trim()
  ) {
    errors.options = 'Poll options must not be same';
  }
  return { errors, valid: Object.keys(errors).length === 0 };
};
