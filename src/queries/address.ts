import axiosClient from '@/httpClient';
import { Address, AddressRes, CreateAddressPayload } from '@/types/address';
import { HttpResponse } from '@/types/common';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';

const getAllProvince = () =>
    axiosClient
        .get('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1', {
            baseURL: '',
            withCredentials: false, // Tắt nếu không cần xác thực

        })
        .then((res) => res.data.data.data as AddressRes[]);

const getDistrictByProvince = (provinceId: string) =>
    axiosClient
        .get(
            `https://vn-public-apis.fpo.vn/districts/${provinceId ? `getByProvince?provinceCode=${provinceId}&` : 'getAll?'
            }limit=-1`,
            {
                baseURL: '',
                withCredentials: false, // Tắt nếu không cần xác thực

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
                withCredentials: false, // Tắt nếu không cần xác thực

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
const createAddress = async (payload: CreateAddressPayload) => {
    try {
        const response = await axiosClient.post('/address/create', payload);
        // Xử lý thành công
        console.log('Address created:', response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Hiển thị thông báo lỗi cho người dùng
            alert(`Error: ${error.response?.data?.message || 'Có lỗi xảy ra!'} - Status: ${error.response?.status}`);
        } else {
            console.error(error);
        }
    }
};


export const useCreateAddress = () => {
    return useMutation({
        mutationFn: (payload: CreateAddressPayload) => createAddress(payload),

        // Xử lý khi thành công
        onSuccess: () => {
            Swal.fire({
                title: 'Cập nhật thành công!',
                icon: 'success',
                confirmButtonText: 'Đóng',
            });
        },

        // Xử lý khi có lỗi
        onError: (error) => {
            console.error('Lỗi khi tạo địa chỉ:', error);
            Swal.fire({
                title: 'Cập nhật thất bại!',
                icon: 'error',
                confirmButtonText: 'Đóng',
            });
        },
    });
};
const getAddress = async () => {
    const res = await axiosClient.get<HttpResponse<Address>>('/address/user/');
    return res.data.data;
};

export const useAddresQuery = () =>
    useQuery<Address>({
        queryKey: ['address/user'],
        queryFn: getAddress,
    });

const getAddressId = async (userId: string): Promise<Address> => {
    const res = await axiosClient.get<HttpResponse<Address>>(`/address/user/${userId}`);
    return res.data.data;
};
export const useAddressIdQuery = (userId: string) => {
    return useQuery<Address>({
        queryKey: [`address`, userId],
        queryFn: () => getAddressId(userId),
        enabled: !!userId,
    });
};

