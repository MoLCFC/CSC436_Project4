const allowedStatuses = ['pending', 'in-progress', 'completed'];

const validateTaskPayload = (payload = {}, { requireAllFields = false, allowPartial = false } = {}) => {
  const errors = [];
  const { title, description, status } = payload;

  if (requireAllFields) {
    if (!title) errors.push('Title is required.');
    if (!description) errors.push('Description is required.');
    if (!status) errors.push('Status is required.');
  } else if (allowPartial) {
    if (title === undefined && description === undefined && status === undefined) {
      errors.push('Provide at least one field to update: title, description, or status.');
    }
  }

  if (title !== undefined && typeof title !== 'string') {
    errors.push('Title must be a string.');
  }

  if (description !== undefined && typeof description !== 'string') {
    errors.push('Description must be a string.');
  }

  if (status !== undefined && !allowedStatuses.includes(status)) {
    errors.push(`Status must be one of: ${allowedStatuses.join(', ')}.`);
  }

  return {
    valid: errors.length === 0,
    errors,
    sanitized: {
      title: title?.trim(),
      description: description?.trim(),
      status
    }
  };
};

module.exports = {
  validateTaskPayload,
  allowedStatuses
};

