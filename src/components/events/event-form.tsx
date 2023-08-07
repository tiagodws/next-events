import { Button } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, type FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

type EventFormProps = {
  defaultValues?: SchemaType;
  onSubmit: SubmitHandler<SchemaType>;
};

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  imageUrl: z.string().url(),
  date: z
    .date()
    .or(
      z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Must be a valid date' })
    ),
  isFeatured: z.boolean(),
});

type SchemaType = z.infer<typeof schema>;

export const EventForm: FC<EventFormProps> = (props) => {
  const { defaultValues, onSubmit } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues && {
      ...defaultValues,
      date: defaultValues.date
        ? new Date(defaultValues.date).toISOString().split('T')[0]
        : '',
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitHandler: SubmitHandler<SchemaType> = async (data) => {
    setIsSubmitting(true);

    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-3xl mx-auto px-4">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-full grid grid-cols-12 gap-x-4"
      >
        <div className="form-control col-span-12">
          <label className="label">
            <span className="label-text">Title</span>
          </label>

          <input
            className={`input input-bordered w-full ${
              errors.title?.message ? 'input-error' : ''
            }`}
            disabled={isSubmitting}
            {...register('title')}
          />

          <label className="label">
            {errors.title?.message && (
              <span className="label-text-alt text-error">
                {errors.title?.message}
              </span>
            )}
          </label>
        </div>

        <div className="form-control col-span-12">
          <label className="label">
            <span className="label-text">Slug</span>
          </label>

          <input
            className={`input input-bordered w-full ${
              errors.slug?.message ? 'input-error' : ''
            }`}
            disabled={isSubmitting}
            {...register('slug')}
          />

          <label className="label">
            {errors.slug?.message && (
              <span className="label-text-alt text-error">
                {errors.slug?.message}
              </span>
            )}
          </label>
        </div>

        <div className="form-control col-span-12">
          <label className="label">
            <span className="label-text">Description</span>
          </label>

          <textarea
            className={`textarea textarea-bordered w-full ${
              errors.description?.message ? 'textarea-error' : ''
            }`}
            disabled={isSubmitting}
            rows={3}
            {...register('description')}
          />

          <label className="label">
            {errors.description?.message && (
              <span className="label-text-alt text-error">
                {errors.description?.message}
              </span>
            )}
          </label>
        </div>

        <div className="form-control col-span-12">
          <label className="label">
            <span className="label-text">Location</span>
          </label>

          <input
            className={`input input-bordered w-full ${
              errors.location?.message ? 'input-error' : ''
            }`}
            disabled={isSubmitting}
            {...register('location')}
          />

          <label className="label">
            {errors.location?.message && (
              <span className="label-text-alt text-error">
                {errors.location?.message}
              </span>
            )}
          </label>
        </div>

        <div className="form-control col-span-12">
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>

          <input
            className={`input input-bordered w-full ${
              errors.imageUrl?.message ? 'input-error' : ''
            }`}
            disabled={isSubmitting}
            {...register('imageUrl')}
          />

          <label className="label">
            {errors.imageUrl?.message && (
              <span className="label-text-alt text-error">
                {errors.imageUrl?.message}
              </span>
            )}
          </label>
        </div>

        <div className="form-control col-span-6">
          <label className="label">
            <span className="label-text">Date</span>
          </label>

          <input
            type="date"
            className={`input input-bordered w-full ${
              errors.date?.message ? 'input-error' : ''
            }`}
            disabled={isSubmitting}
            {...register('date')}
          />

          <label className="label">
            {errors.date?.message && (
              <span className="label-text-alt text-error">
                {errors.date?.message}
              </span>
            )}
          </label>
        </div>

        <div className="form-control col-span-6">
          <label className="label">
            <span className="label-text">Is featured?</span>
          </label>

          <div className="flex flex-col align-center">
            <input
              type="checkbox"
              className="toggle mt-2"
              disabled={isSubmitting}
              {...register('isFeatured')}
            />
          </div>
        </div>

        <div className="form-control col-span-12 mt-4">
          <Button
            type="submit"
            className="btn-primary"
            isLoading={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
