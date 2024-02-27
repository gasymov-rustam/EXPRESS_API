import { JSX, memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Link } from '@nextui-org/react';

import { isError } from '../../../utils';
import { useRegisterMutation } from '../../../services';
import { ErrorMessage, Input } from '../../../components';

interface RegisterFormProps {
  email: string;
  name: string;
  password: string;
}

interface RegisterProps {
  setSelected: (value: string) => void;
}

export const Register = memo(({ setSelected }: RegisterProps): JSX.Element | null => {
  const [register] = useRegisterMutation();
  const [error, setError] = useState('');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormProps>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterFormProps) => {
    try {
      await register(data).unwrap();
      setSelected('login');
    } catch (err) {
      if (isError(err)) {
        setError(err.data.error);
      }
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input control={control} required="Обязательное поле" label="Имя" name="name" />
      <Input control={control} name="email" label="Email" type="email" required="Обязательное поле" />
      <Input control={control} name="password" label="Пароль" type="password" required="Обязательное поле" />

      <ErrorMessage error={error} />

      <p className="text-center text-small">
        Уже есть аккаунт?{' '}
        <Link size="sm" className="cursor-pointer" onPress={() => setSelected('login')}>
          Войдите
        </Link>
      </p>

      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit">
          Зарегистрироваться
        </Button>
      </div>
    </form>
  );
});
