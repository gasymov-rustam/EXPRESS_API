import { JSX, memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Textarea } from '@nextui-org/react';

import { ErrorMessage } from '../ErrorMessage';
import { useCreatePostMutation, useLazyGetAllPostsQuery } from '../../services';
import { IoMdCreate } from 'react-icons/io';

export const CreatePost = memo((): JSX.Element | null => {
  const [createPost] = useCreatePostMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createPost({ content: data.post }).unwrap();
      setValue('post', '');
      await triggerGetAllPosts().unwrap();
    } catch (error) {
      console.log('err', error);
    }
  });

  const error = errors?.post?.message as string;

  return (
    <form className="flex-grow" onSubmit={onSubmit}>
      <Controller
        name="post"
        control={control}
        defaultValue=""
        rules={{
          required: 'Обязательное поле',
        }}
        render={({ field }) => (
          <Textarea {...field} labelPlacement="outside" placeholder="О чем думайте?" className="mb-5" />
        )}
      />
      {errors && <ErrorMessage error={error} />}
      <Button color="success" className="flex-end" endContent={<IoMdCreate />} type="submit">
        Добавить пост
      </Button>
    </form>
  );
});
