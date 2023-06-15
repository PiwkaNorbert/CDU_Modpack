export default function getDiscordProfileData() {
  let userProfile = {
    isLoggedIn: false,
    id: '', 
    avatar: '', 
    globalName: '', 
    username: '', 
    isAdmin: false,
    votesRemaining: undefined,
    tokenExpiry: undefined,

  };

  try {
    const userProfileData = localStorage.getItem("user_profile");

    if (userProfileData) {
      const parsedProfile = JSON.parse(userProfileData);

      userProfile = {
        ...userProfile,
        ...parsedProfile
      };
    }
  } catch (error) {
    console.error('Error parsing user profile data', error);
  }

  return userProfile;
}