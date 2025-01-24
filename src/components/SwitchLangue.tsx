'use client';

import { Locale, locales } from '@/i18n/config';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { setUserLocale } from '@/services/locale';

const SwitchLangue = () => {
    return (
        <Select
            onValueChange={(value) => {
                setUserLocale(value as Locale);
            }}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Langues</SelectLabel>
                    {locales.map((_item) => (
                        <SelectItem key={_item} value="apple">
                            {_item}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SwitchLangue;
