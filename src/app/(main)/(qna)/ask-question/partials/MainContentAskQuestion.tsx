'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import MonacoEditor from '@monaco-editor/react';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { QuestionSchema, questionSchema } from '../schema/questionSchema';
import LanguageSeletor from './LanguageSeletor';
import { useCreateQuestionMutation } from '@/queries/question';

export default function MainContentAskQuestion() {
    const [selectedLanguage, setSelectedLanguage] = useState('typescript');

    const { mutateAsync } = useCreateQuestionMutation();

    const {
        register,

        control,
        formState: { errors },
        handleSubmit,
    } = useForm<QuestionSchema>({
        resolver: zodResolver(questionSchema),
    });

    const onSubmit = async (data: QuestionSchema) => {
        console.log('[data]: ', data);

        const payload = {
            topic: data.topic,
            title: data.title,
            question: data.content,
            code: {
                fileType: selectedLanguage,
                code: data.code,
            },
        };

        await mutateAsync(payload);
    };

    return (
        <div className="max-w-2xl mx-auto p-8 mb-10 bg-card shadow-lg rounded-xl">
            <Link
                href="/myquestion"
                className="flex items-center justify-center w-10 h-10 mb-3  rounded-full bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-700"
            >
                <ArrowLeftIcon className="w-6 h-6" />
            </Link>
            <h2 className="text-3xl font-bold  text-center text-gray-800">
                Ask a Question
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-neutral-900 font-medium mb-2">
                        Topic
                    </label>
                    <input
                        {...register('topic')}
                        type="text"
                        className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Write a title..."
                        defaultValue="67aec593090fde960dd8f81c"
                    />
                    {errors.topic && (
                        <p className="text-red-500">{errors.topic.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-neutral-900 font-medium mb-2">
                        Title
                    </label>
                    <input
                        {...register('title')}
                        type="text"
                        className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Write a title..."
                    />
                    {errors.title && (
                        <p className="text-red-500">{errors.title.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-neutral-900 font-medium mb-2">
                        Content
                    </label>
                    <textarea
                        {...register('content')}
                        placeholder="Write a something..."
                        className="w-full p-3 border border-border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {errors.content && (
                        <p className="text-red-500">{errors.content.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-neutral-900 font-medium mb-2">
                        Have you code ?
                    </label>
                    <LanguageSeletor
                        curLaguage={selectedLanguage}
                        setCurlanguage={setSelectedLanguage}
                        className="mb-4"
                    />
                    <p>Demo</p>
                    <Controller
                        name="code"
                        control={control}
                        render={({ field }) => (
                            <MonacoEditor
                                onChange={field.onChange}
                                language={selectedLanguage}
                                height={500}
                                value={`const helloWorld = () => {};`}
                                theme="vs-dark"
                            />
                        )}
                    />
                    {errors.code && (
                        <p className="text-red-500">{errors.code.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-neutral-900 font-medium mb-2">
                        Hagtag
                    </label>
                    <input
                        {...register('hashtag')}
                        type="text"
                        className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Start by #...(ex: #cyber, #code,...)"
                    />
                    {errors.hashtag && (
                        <p className="text-red-500">{errors.hashtag.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-neutral-900 font-medium mb-2">
                        Upload Image/Video
                    </label>
                    <div className="border border-border bg-neutral-100 rounded-lg p-6 flex items-center justify-center cursor-pointer hover:bg-input">
                        <div className="text-center text-gray-500">
                            <span className="text-xl">📷</span>
                            <p className="text-sm mt-1">Thêm ảnh/video</p>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary-500 text-accent-foreground p-3 rounded-lg font-semibold hover:bg-primary-200 transition duration-300"
                >
                    Post
                </button>
            </form>
        </div>
    );
}
