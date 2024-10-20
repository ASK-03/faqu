import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getAuthUserDetails, initOrUpdateUserData } from "@/lib/queries";

const SignUpForm = async () => {
  const authUser = await currentUser();
  if (!authUser) {
    return redirect("/sign-in");
  }
  console.log(authUser.publicMetadata.role);
  const user = await getAuthUserDetails();
  if (!user) {
    const user = await initOrUpdateUserData({
      email: authUser.emailAddresses[0].emailAddress,
    });
    return redirect(`/${user?.id}/chat`);
  }

  return redirect(`/${user?.id}/chat`);
};

export default SignUpForm;
