export interface AddressRes {
    _id: string;
    name: string;
    slug: string;
    type: string;
    name_with_type: string;
    code: string;
    isDeleted: boolean;
    with_type?: string;
    withType?: string;

}
interface Province {
    code: string;
    name: string;
}

export interface CreateAddressPayload {
    province: string;
    provinceSlug: string;
    provinceWithType: string;
    district: string;
    districtSlug: string;
    districtWithType: string;
    ward: string;
    wardSlug: string;
    wardWithType: string;
    address: string;
    country: string;
}

export interface Address {
    province: string;
    provinceSlug: string;
    provinceWithType: string;
    district: string;
    districtSlug: string;
    districtWithType: string;
    ward: string;
    wardSlug: string;
    wardWithType: string;
    address: string;
    country: string;
}