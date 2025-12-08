function globalError() {
  const error = Error('Глобальная ошибка');
  error.name = 'GlobalError';
  throw error;
}

function localError() {
  const error = Error('Локальная ошибка');
  error.name = 'LocalError';
  throw error;
}

function globalError() {
  const error = Error('Глобальная ошибка');
  error.name = 'GlobalError';
  throw error;
}

function localError() {
  const error = Error('Локальная ошибка');
  error.name = 'LocalError';
  throw error;
}

function testErrorScope(fn) {
  try {
    try {
      fn();
    } catch (error) {
      console.log('Обнаружена локальная ошибка');
      console.error(error);
    }
  } catch (error) {
    console.log('Обнаружена глобальная ошибка');
    console.error(error);
  }
}
testErrorScope(localError);
testErrorScope(globalError);
