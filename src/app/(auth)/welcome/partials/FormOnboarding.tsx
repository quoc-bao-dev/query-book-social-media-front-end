'use client';

import { Button } from '@/components/common/Button';
import UploadIcon from '@/components/icons/UploadIcon';
import { Button as ButtonUI } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import axiosClient from '@/httpClient';
import { cn } from '@/lib/utils';
import { useFollowMutation } from '@/queries/follow';
import { useJobTitleQuery } from '@/queries/jobTitle';
import { getUserSuggestion } from '@/queries/user';
import { UserResponse, UserSuggestResponse } from '@/types/user';
import { uploadImage } from '@/utils/uploadUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use, useCallback, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  formUserOnboarding,
  FormUserOnboardingSchema,
} from '../schema/formUserOnboarding';
import { sFollowIdSignal } from '../signal/followIdSginal';
import FollowItem from './FollowItem';

const FormOnboarding = ({ step = 1 }: { step: number }) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [followSuggest, setFollowSuggest] = useState<UserSuggestResponse[]>([]);
  const [user, setUser] = useState<UserResponse | null>(null);

  const { data } = useJobTitleQuery();

  const { mutateAsync } = useFollowMutation();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await getUserSuggestion({
        limit: 4,
        page: 1,
        suggestMode: 'follow_suggest',
      });
      const userRes = await axiosClient.get('/users/me');

      setFollowSuggest(res);
      setUser(userRes.data.data);
      console.log(userRes.data.data);
    })();

    return () => {
      sFollowIdSignal.reset();
    };
  }, []);

  const {
    register,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<FormUserOnboardingSchema>({
    resolver: zodResolver(formUserOnboarding),
  });

  const lsJobTitle = data?.data.data ?? [];

  //FIXME: fix errors when have errors return

  const nextStep = () => {
    if (step === 1) {
      router.push('/welcome?step=2');
    }
    if (step === 2) {
      router.push('/welcome?step=3');
    }
    if (step === 3) {
      router.push('/welcome?step=4');
    }
  };
  const prevStep = () => {
    if (step === 2) {
      router.push('/welcome?step=1');
    }
    if (step === 3) {
      router.push('/welcome?step=2');
    }
    if (step === 4) {
      router.push('/welcome?step=3');
    }
  };

  const avatarReview = watch('avatarFile');

  const imageReview = user?.avatarUrl
    ? user?.avatarUrl
    : avatarReview?.length > 0 && URL.createObjectURL(avatarReview[0]);

  const curJobTitle = watch('jobTitle');

  const handleFollow = (id: string) => {
    mutateAsync(id);
  };

  const onSubmit: SubmitHandler<FormUserOnboardingSchema> = async (data) => {
    if (step < 4) return;
    const jodId = lsJobTitle.filter((_job) => _job.title === data.jobTitle)[0]
      .id;

    //upload file

    try {
      const file =
        data?.avatarFile.length > 0
          ? await uploadImage(data.avatarFile[0])
          : undefined;

      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        jobTitle: jodId,
        avatar: file
          ? {
              fileName: file,
              type: 'image',
              sourceType: 'file',
            }
          : undefined,
      };

      const uploadRes = await axiosClient.patch('/users/profile', payload);

      if (uploadRes) {
        router.push('/');
      }
    } catch (error) {
      alert(error);
    }
  };

  const FormStep1 = () => (
    <div>
      <h2 className='text-base text-gray-700'>
        Please provide your first and last name to personalize your experience.
      </h2>
      <div className='mt-6 flex flex-col gap-4'>
        <div className=''>
          <label className='font-medium'>First Name</label>
          <Input
            className='mt-2'
            {...register('firstName')}
            placeholder='First Name'
          />
          {errors.firstName && (
            <p className='text-xs text-red-500 mt-2'>
              {errors.firstName.message as string}
            </p>
          )}
        </div>
        <div className=''>
          <label className='font-medium'>Last Name</label>
          <Input
            className='mt-2'
            {...register('lastName')}
            placeholder='Last Name'
          />
          {errors.lastName && (
            <p className='text-xs text-red-500'>
              {errors.lastName.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
  const FormStep2 = () => (
    <div>
      <h2 className='text-base text-gray-700'>
        Upload a profile picture to help others recognize you. You can skip this
        step and update it later.
      </h2>
      <div className='mt-6 '>
        <div className='max-w-[300px] mx-auto'>
          <label htmlFor='avatar'>
            {!imageReview && (
              <div className='w-full aspect-square rounded-lg bg-gray-300 border border-gray-500 border-dashed flex items-center justify-center'>
                <UploadIcon className='size-[60px]' />
              </div>
            )}
            {!!imageReview && (
              <div className='w-full aspect-square rounded-lg overflow-hidden'>
                <Image
                  src={imageReview}
                  alt=''
                  width={346}
                  height={346}
                  className=' h-full aspect-square object-cover'
                />
              </div>
            )}
          </label>
        </div>
      </div>
      <input {...register('avatarFile')} type='file' id='avatar' hidden />
    </div>
  );

  const FormStep3 = () => (
    <div>
      <h2 className='text-base text-gray-700'>
        Select your current job title or role from the list. This helps us
        tailor your experience to your profession.
      </h2>
      <div className='mt-6'>
        <Controller
          control={control}
          name='jobTitle'
          render={({ field }) => (
            <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
              <PopoverTrigger asChild>
                <ButtonUI
                  variant='outline'
                  role='combobox'
                  aria-expanded={isOpenPopover}
                  className='w-full justify-between'
                >
                  {curJobTitle
                    ? lsJobTitle.find((job) => job.title === curJobTitle)?.title
                    : 'Select your job title...'}
                  <ChevronsUpDown className='opacity-50' />
                </ButtonUI>
              </PopoverTrigger>
              <PopoverContent className='max-w-[360px] w-[360px] p-0'>
                <Command>
                  <CommandInput placeholder='Search job title...' />
                  <CommandList>
                    <CommandEmpty>No job title found.</CommandEmpty>
                    <CommandGroup>
                      {lsJobTitle.map((job) => (
                        <CommandItem
                          key={job.id}
                          value={job.title}
                          onSelect={(currentValue) => {
                            field.onChange(
                              currentValue === curJobTitle ? '' : currentValue,
                            );
                            setIsOpenPopover(false);
                          }}
                        >
                          {job.title}
                          <Check
                            className={cn(
                              'ml-auto',
                              curJobTitle === job.title
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        />
      </div>
    </div>
  );
  const FormStep4 = useCallback(
    () => (
      <div className='w-full'>
        <h2 className='text-base text-gray-700'>
          Follow people you’re interested in to personalize your feed. Don’t
          worry, you can always add more later.
        </h2>
        <ScrollArea className='max-h-[300px] mt-6'>
          <div className='grid gap-4'>
            {followSuggest?.map((follow) => (
              <FollowItem
                key={follow.id}
                name={follow.fullName}
                avatar={follow.avatarUrl}
                title={follow.professional}
                id={follow.id}
                onFollow={handleFollow}
              />
            ))}
          </div>
          <ScrollBar orientation='vertical' />
        </ScrollArea>
      </div>
    ),
    [followSuggest, handleFollow],
  );

  useEffect(() => {
    user?.firstName && setValue('firstName', user?.firstName);
    user?.lastName && setValue('lastName', user?.lastName);
  }, [user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='max-w-[380px]'>
        {step === 1 && <FormStep1 />}
        {step === 2 && <FormStep2 />}
        {step === 3 && <FormStep3 />}
        {step === 4 && <FormStep4 />}
      </div>
      <div className='pt-10 flex gap-3 '>
        {step >= 2 && (
          <Button variant='ghost' onClick={prevStep} className='flex-1'>
            Back
          </Button>
        )}
        <Button onClick={nextStep} className='flex-1'>
          {step === 4 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </form>
  );
};

export default FormOnboarding;
