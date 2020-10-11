import { useState, useCallback } from 'react';

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const setInput = useCallback((e) => setValue(e.target.value), []);

  const clear = useCallback(() => setValue(''), []);

  return [value, setInput, setValue, clear];
};

export default useInput;
