import axiosClient from '@/httpClient';
import { AddressRes } from '@/types/address';
import { useQuery } from '@tanstack/react-query';

const getAllProvince = () =>
    axiosClient
        .get('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1', {
            baseURL: '',
        })
        .then((res) => res.data.data.data as AddressRes[]);

const getDistrictByProvince = (provinceId: string) =>
    axiosClient
        .get(
            `https://vn-public-apis.fpo.vn/districts/${provinceId ? `getByProvince?provinceCode=${provinceId}&` : 'getAll?'
            }limit=-1`,
            {
                baseURL: '',
            },
        )
        .then((res) => res.data.data.data);

const getWardByDistrict = (districtId: string) =>
    axiosClient
        .get(
            `https://vn-public-apis.fpo.vn/wards/${districtId ? `getByDistrict?districtCode=${districtId}&` : 'getAll?'
            }limit=-1`,
            {
                baseURL: '',
            },
        )
        .then((res) => res.data.data.data);

export const useAddressQuery = ({
    mode = 'provinces',
    code = '',
}: {
    mode: 'provinces' | 'districts' | 'wards';
    code?: string;
}) => {
    const queryFn =
        mode === 'provinces'
            ? getAllProvince
            : mode === 'districts'
                ? getDistrictByProvince
                : getWardByDistrict;
    return useQuery({
        queryFn: () => queryFn(code),
        queryKey: ['address', mode, code],
    });
};