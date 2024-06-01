const getServerSession = async (getKindeServerSession: any) => {
  const {
    getAccessToken,
    getBooleanFlag,
    getFlag,
    getIdToken,
    getIntegerFlag,
    getOrganization,
    getPermission,
    getPermissions,
    getRoles,
    getStringFlag,
    getUser,
    getUserOrganizations,
    isAuthenticated,
  } = getKindeServerSession();

  // console.log(await getAccessToken());
  // console.log(await getBooleanFlag("bflag", false));
  // console.log(await getFlag("flag", "x", "s"));
  // console.log(await getIntegerFlag("iflag", 99));
  // console.log(await getOrganization());
  // console.log(await getPermission("eat:chips"));
  // console.log(await getPermissions());
  // console.log(await getStringFlag("sflag", "test"));
  // console.log(await getUser());
  // console.log(await getUserOrganizations());
  // console.log(await isAuthenticated());
  const data = await getUser();
  const email = data?.email || "";
  const userid = data?.id;
  const img = data?.picture;
  const name = data?.family_name;

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
