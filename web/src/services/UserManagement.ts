import { UserInfo } from "@models/UserInfo";
import { AdminConfigPath, AdminManageUserPath, AdminUserInfoPath } from "@services/Api";
import { DeleteWithOptionalResponse, Get, PostWithOptionalResponse, PutWithOptionalResponse } from "@services/Client";
import { UserInfoPayload, toSecondFactorMethod } from "@services/UserInfo";

export async function getAllUserInfo(): Promise<UserInfo[]> {
    const res = await Get<UserInfoPayload[]>(AdminUserInfoPath);
    return res.map((user) => ({ ...user, method: toSecondFactorMethod(user.method) }));
}

interface UserChangeFields {
    password?: string;
    display_name?: string;
    disabled?: boolean;
    email?: string;
    groups?: string[];
}

export interface AdminConfigBody {
    enabled: boolean;
    admin_group: string;
    allow_admins_to_add_admins: boolean;
}

interface DeleteUserBody {
    username: string;
}

export async function postChangeUser(username: string, changes: Partial<UserChangeFields>) {
    const data = {
        username,
        ...Object.fromEntries(Object.entries(changes).filter(([_, value]) => value !== undefined)),
    };

    return PostWithOptionalResponse(AdminManageUserPath, data);
}

export async function putNewUser(
    username: string,
    display_name: string,
    password: string,
    email: string,
    groups: string[],
) {
    const data = {
        username,
        display_name,
        password,
        email,
        groups,
    };
    return PutWithOptionalResponse(AdminManageUserPath, data);
}

export async function deleteDeleteUser(username: string) {
    const data: DeleteUserBody = {
        username,
    };
    return DeleteWithOptionalResponse(AdminManageUserPath, data);
}

export async function getAdminConfiguration(): Promise<AdminConfigBody> {
    return await Get<AdminConfigBody>(AdminConfigPath);
}
