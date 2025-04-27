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