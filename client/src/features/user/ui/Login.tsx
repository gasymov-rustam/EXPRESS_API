import { JSX, memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Link } from '@nextui-org/react';

import { isError } from '../../../utils';
import { ErrorMessage, Input } from '../../../components';
import { useLazyCurrentQuery, useLoginMutation } from '../../../services';

interface LoginFormProps {
  email: string;
  password: string;
}

interface LoginProps {
  setSelected: (value: string) => void;
}

export const Login = memo(({ setSelected }: LoginProps): JSX.Element | null => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const [triggerCurrentQuery] = useLazyCurrentQuery();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormProps>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormProps) => {
    try {
      await login(data).unwrap();
      await triggerCurrentQuery();

      navigate('/');
    } catch (err) {
      if (isError(err)) {
        setError(err.data.error);
      }
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input control={control} name="email" label="Email" type="email" required="Обязательное поле" />
      <Input control={control} name="password" label="Пароль" type="password" required="Обязательное поле" />

      <ErrorMessage error={error} />

      <p className="text-center text-small">
        Нет аккаутна?{' '}
        <Link size="sm" className="cursor-pointer" onPress={() => setSelected('sign-up')}>
          Зарегистрируйтесь
        </Link>
      </p>

      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Войти
        </Button>
      </div>
    </form>
  );
});
