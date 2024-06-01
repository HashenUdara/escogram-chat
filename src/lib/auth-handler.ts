import { getAccessToken } from "@kinde-oss/kinde-auth-nextjs/dist/types/session/getAccessToken";
import { getAccessTokenRaw } from "@kinde-oss/kinde-auth-nextjs/dist/types/session/getAccessTokenRaw";
import { getBooleanFlag } from "@kinde-oss/kinde-auth-nextjs/dist/types/session/getBooleanFlag";
import { getClaim } from "@kinde-oss/kinde-auth-nextjs/dist/types/session/getClaim";
import { getFlag } from "@kinde-oss/kinde-auth-nextjs/dist/types/session/getFlag";
import { getIdToken } from "@kinde-oss/kinde-auth-nextjs/dist/types/session/getIdToken";
import { getIdTokenRaw } from "@kinde-oss/kinde-auth-nextjs/dist/types/session/getIdTokenRaw";
import { getIntegerFlag } from "@kinde-oss/kinde-auth-nextjs/dist/types/session/getIntegerFlag";
import { getOrganization } from "@kinde-oss/kinde-auth-nextjs/dist/types/session/getOrganization";
import { getPermission } from "@kinde-oss/kinde-auth-nextjs/dist/types/session/getPermission";
import { getPermissions } from "@kinde-oss/kinde-auth-nextjs/dist/types/session/getPermissions";
import { getRoles } from "@kinde-oss/kinde-auth-nextjs/dist/types/session/getRoles";
import { getStringFlag } from "@kinde-oss/kinde-auth-nextjs/dist/types/session/getStringFlag";
import { getUser } from "@kinde-oss/kinde-auth-nextjs/dist/types/session/getUser";
import { getUserOrganizations } from "@kinde-oss/kinde-auth-nextjs/dist/types/session/getUserOrganizations";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "./db";
import { fetchRedis } from "@/helpers/redis";
import { redirect } from "next/navigation";

const getServerSession = async (getKindeServerSession: {
  (
    req?: Request | NextApiRequest | undefined,
    res?: Response | NextApiResponse<any> | undefined
  ): {
    refreshTokens: () => Promise<any>;
    getAccessToken: getAccessToken;
    getBooleanFlag: getBooleanFlag;
    getFlag: getFlag;
    getIdToken: getIdToken;
    getIdTokenRaw: getIdTokenRaw;
    getAccessTokenRaw: getAccessTokenRaw;
    getIntegerFlag: getIntegerFlag;
    getOrganization: getOrganization;
    getPermission: getPermission;
    getPermissions: getPermissions;
    getStringFlag: getStringFlag;
    getUser: getUser;
    getUserOrganizations: getUserOrganizations;
    isAuthenticated: () => Promise<boolean>;
    getRoles: getRoles;
    getClaim: getClaim;
  };
  (
    req?: Request | NextApiRequest | undefined,
    res?: Response | NextApiResponse<any> | undefined
  ): {
    refreshTokens: () => Promise<any>;
    getAccessToken: getAccessToken;
    getBooleanFlag: getBooleanFlag;
    getFlag: getFlag;
    getIdToken: getIdToken;
    getIdTokenRaw: getIdTokenRaw;

    getAccessTokenRaw: getAccessTokenRaw;
    getIntegerFlag: getIntegerFlag;
    getOrganization: getOrganization;
    getPermission: getPermission;
    getPermissions: getPermissions;
    getStringFlag: getStringFlag;
    getUser: getUser;
    getUserOrganizations: getUserOrganizations;
    isAuthenticated: () => Promise<boolean>;
    getRoles: getRoles;
    getClaim: getClaim;
  };
  (
    req?: Request | NextApiRequest | undefined,
    res?: Response | NextApiResponse<any> | undefined
  ): {
    refreshTokens: () => Promise<any>;
    getAccessToken: getAccessToken;
    getBooleanFlag: getBooleanFlag;
    getFlag: getFlag;
    getIdToken: getIdToken;
    getIdTokenRaw: getIdTokenRaw;
    getAccessTokenRaw: getAccessTokenRaw;
    getIntegerFlag: getIntegerFlag;
    getOrganization: getOrganization;
    getPermission: getPermission;
    getPermissions: getPermissions;
    getStringFlag: getStringFlag;
    getUser: getUser;
    getUserOrganizations: getUserOrganizations;
    isAuthenticated: () => Promise<boolean>;
    getRoles: getRoles;
    getClaim: getClaim;
  };
  (
    req?: Request | NextApiRequest | undefined,
    res?: Response | NextApiResponse<any> | undefined
  ): {
    refreshTokens: () => Promise<any>;
    getAccessToken: getAccessToken;
    getBooleanFlag: getBooleanFlag;
    getFlag: getFlag;
    getIdToken: getIdToken;
    getIdTokenRaw: getIdTokenRaw;
    getAccessTokenRaw: getAccessTokenRaw;
    getIntegerFlag: getIntegerFlag;
    getOrganization: getOrganization;
    getPermission: getPermission;
    getPermissions: getPermissions;
    getStringFlag: getStringFlag;
    getUser: getUser;
    getUserOrganizations: getUserOrganizations;
    isAuthenticated: () => Promise<boolean>;
    getRoles: getRoles;
    getClaim: getClaim;
  };
  (
    req?: Request | NextApiRequest | undefined,
    res?: Response | NextApiResponse<any> | undefined
  ): {
    refreshTokens: () => Promise<any>;
    getAccessToken: getAccessToken;
    getBooleanFlag: getBooleanFlag;
    getFlag: getFlag;
    getIdToken: getIdToken;
    getIdTokenRaw: getIdTokenRaw;
    getAccessTokenRaw: getAccessTokenRaw;
    getIntegerFlag: getIntegerFlag;
    getOrganization: getOrganization;
    getPermission: getPermission;
    getPermissions: getPermissions;
    getStringFlag: getStringFlag;
    getUser: getUser;
    getUserOrganizations: getUserOrganizations;
    isAuthenticated: () => Promise<boolean>;
    getRoles: getRoles;
    getClaim: getClaim;
  };
  (
    req?: Request | NextApiRequest | undefined,
    res?: Response | NextApiResponse<any> | undefined
  ): {
    refreshTokens: () => Promise<any>;
    getAccessToken: getAccessToken;
    getBooleanFlag: getBooleanFlag;
    getFlag: getFlag;
    getIdToken: getIdToken;
    getIdTokenRaw: getIdTokenRaw;
    getAccessTokenRaw: getAccessTokenRaw;
    getIntegerFlag: getIntegerFlag;
    getOrganization: getOrganization;
    getPermission: getPermission;
    getPermissions: getPermissions;
    getStringFlag: getStringFlag;
    getUser: getUser;
    getUserOrganizations: getUserOrganizations;
    isAuthenticated: () => Promise<boolean>;
    getRoles: getRoles;
    getClaim: getClaim;
  };
  (
    req?: Request | NextApiRequest | undefined,
    res?: Response | NextApiResponse<any> | undefined
  ): {
    refreshTokens: () => Promise<any>;
    getAccessToken: getAccessToken;
    getBooleanFlag: getBooleanFlag;
    getFlag: getFlag;
    getIdToken: getIdToken;
    getIdTokenRaw: getIdTokenRaw;
    getAccessTokenRaw: getAccessTokenRaw;
    getIntegerFlag: getIntegerFlag;
    getOrganization: getOrganization;
    getPermission: getPermission;
    getPermissions: getPermissions;
    getStringFlag: getStringFlag;
    getUser: getUser;
    getUserOrganizations: getUserOrganizations;
    isAuthenticated: () => Promise<boolean>;
    getRoles: getRoles;
    getClaim: getClaim;
  };
  (
    req?: Request | NextApiRequest | undefined,
    res?: Response | NextApiResponse<any> | undefined
  ): {
    refreshTokens: () => Promise<any>;
    getAccessToken: getAccessToken;
    getBooleanFlag: getBooleanFlag;
    getFlag: getFlag;
    getIdToken: getIdToken;
    getIdTokenRaw: getIdTokenRaw;
    getAccessTokenRaw: getAccessTokenRaw;
    getIntegerFlag: getIntegerFlag;
    getOrganization: getOrganization;
    getPermission: getPermission;
    getPermissions: getPermissions;
    getStringFlag: getStringFlag;
    getUser: getUser;
    getUserOrganizations: getUserOrganizations;
    isAuthenticated: () => Promise<boolean>;
    getRoles: getRoles;
    getClaim: getClaim;
  };
  (
    req?: Request | NextApiRequest | undefined,
    res?: Response | NextApiResponse<any> | undefined
  ): {
    refreshTokens: () => Promise<any>;
    getAccessToken: getAccessToken;
    getBooleanFlag: getBooleanFlag;
    getFlag: getFlag;
    getIdToken: getIdToken;
    getIdTokenRaw: getIdTokenRaw;
    getAccessTokenRaw: getAccessTokenRaw;
    getIntegerFlag: getIntegerFlag;
    getOrganization: getOrganization;
    getPermission: getPermission;
    getPermissions: getPermissions;
    getStringFlag: getStringFlag;
    getUser: getUser;
    getUserOrganizations: getUserOrganizations;
    isAuthenticated: () => Promise<boolean>;
    getRoles: getRoles;
    getClaim: getClaim;
  };
  (
    req?: Request | NextApiRequest | undefined,
    res?: Response | NextApiResponse<any> | undefined
  ): {
    refreshTokens: () => Promise<any>;
    getAccessToken: getAccessToken;
    getBooleanFlag: getBooleanFlag;
    getFlag: getFlag;
    getIdToken: getIdToken;
    getIdTokenRaw: getIdTokenRaw;
    getAccessTokenRaw: getAccessTokenRaw;
    getIntegerFlag: getIntegerFlag;
    getOrganization: getOrganization;
    getPermission: getPermission;
    getPermissions: getPermissions;
    getStringFlag: getStringFlag;
    getUser: getUser;
    getUserOrganizations: getUserOrganizations;
    isAuthenticated: () => Promise<boolean>;
    getRoles: getRoles;
    getClaim: getClaim;
  };
  (
    req?: Request | NextApiRequest | undefined,
    res?: Response | NextApiResponse<any> | undefined
  ): {
    refreshTokens: () => Promise<any>;
    getAccessToken: getAccessToken;
    getBooleanFlag: getBooleanFlag;
    getFlag: getFlag;
    getIdToken: getIdToken;
    getIdTokenRaw: getIdTokenRaw;
    getAccessTokenRaw: getAccessTokenRaw;
    getIntegerFlag: getIntegerFlag;
    getOrganization: getOrganization;
    getPermission: getPermission;
    getPermissions: getPermissions;
    getStringFlag: getStringFlag;
    getUser: getUser;
    getUserOrganizations: getUserOrganizations;
    isAuthenticated: () => Promise<boolean>;
    getRoles: getRoles;
    getClaim: getClaim;
  };
  (): {
    getAccessToken: any;
    getBooleanFlag: any;
    getFlag: any;
    getIdToken: any;
    getIntegerFlag: any;
    getOrganization: any;
    getPermission: any;
    getPermissions: any;
    getRoles: any;
    getStringFlag: any;
    getUser: any;
    getUserOrganizations: any;
    isAuthenticated: any;
  };
}) => {
  const { getUser, isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect("/");
  }
  const data = await getUser();
  const email = data?.email || "";
  const userid = data?.id;
  const img = data?.picture;
  const name = `${data?.given_name || ""} ${data?.family_name || ""}`;
  const userdata = {
    email: email,
    id: userid,
    image: img,
    name: name,
  };
  const isUser = (await fetchRedis("get", `user:email:${email}`)) as 0 | 1;
  console.log("hloremsdhsbdsdsndjsdnsdsdsnhdensjdnewjndendneujdnujenu", isUser);
  if (!isUser) {
    console.log(
      "loremsdhsbdsdsndjsdnsdsdsnhdensjdnewjndendneujdnujenu",
      isUser
    );

    db.set(`user:email:${email}`, userid);

    db.set(`user:${userid}`, userdata);
  }

  return {
    user: {
      id: userid as string,
      name: name as string,
      email: email as string,
      image: img as string,
    },
  };
};

export { getServerSession };
