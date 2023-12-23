import { useState } from 'react';

function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  function handleValueChange({ target }) {
    setValue(target.value);
  }

  function clearValue() {
    setValue(defaultValue);
  }

  return [value, clearValue, setValue];
}

export default useInput;
