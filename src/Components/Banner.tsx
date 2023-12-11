import useUser from "../Context/useUser";

function Banner() {
  const { user } = useUser();
  if (!user) return;

  const { isLoggedIn, inGuild, isLinked } = user;

  if (isLoggedIn && (!inGuild || !isLinked)) {
    return (
      <div className=" bg-acc/[.75] dark:text-text-1 text-bg px-4 py-2  text-center">
        <p>
          Join our discord server and link your account to vote for and suggest
          modpacks,{" "}
          <a
            href="https://forum.playcdu.co/threads/how-to-link-your-discord-and-minecraft-accounts.922/"
            className="underline text-text/80 hover:text-opacity-100 transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            click here
          </a>
          .
        </p>
      </div>
    );
  }

  return null;
}

export default Banner;
