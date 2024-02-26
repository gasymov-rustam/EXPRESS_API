import { makeStore } from './app/store';
import { Provider } from 'react-redux';
import { Button } from '@nextui-org/react';
import { useGetUserByIdQuery } from './services';
import { ThemeProvider, useTheme } from './providers/ThemeProvider';

const Test = () => {
  const { toggleTheme, theme } = useTheme();
  const response = useGetUserByIdQuery('1');
  console.log('🚀 => 👍 ==>> App.tsx ==>> Line #8 ==>> ', response);
  console.log('🚀 => 👍 ==>> App.tsx ==>> Line #11 ==>> ', theme, toggleTheme);
  return <div>Test</div>;
};

export const App = () => {
  return (
    <Provider store={makeStore()}>
      <ThemeProvider>
        <div>
          <Test />
          <Button color="primary">Click me</Button>
        </div>
      </ThemeProvider>
    </Provider>
  );
};
