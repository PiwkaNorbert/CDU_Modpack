import axios from "axios";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

function SuggestedByUserSearch() {
  const [loading, setLoading] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [exists, setExists] = useState(false);

  const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  const isValid =
    username.length > 2 && username.length < 16 && re.test(username);
  const isTouched = username.length > 0;

  // handle the setUsername to add the previos value to the new value
  const handleSetUsername = (e: any) => {
    setUsername(e.target.value);
  };

  async function confirmUsername() {
    if (!isValid) return;

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    setLoading(true);

    const newDebounceTimer = setTimeout(async () => {
      // axios fetch with no cors
      const { data, status } = await axios(
        `https://api.playcdu.co/search?partial_name=${username}&max_results=1`
      );
      console.log(status);

      if (status !== 200) throw new Error("Error searching for username");
      console.log(data);

      if (data.users.some((user: any) => user.username === username)) {
        console.log("Username exists");
        setUsername("");
        setExists(true);
      } else {
        console.log("Username does not exist");
        setUsername("");
        setExists(false);
      }

      setLoading(false);
    }, 1000);

    setDebounceTimer(newDebounceTimer);
  }

  useEffect(() => {
    confirmUsername();
    console.log("username changed");
  }, [username]);

  return (
    <>
      <input
        className={twMerge(
          "h-8 rounded-md border-2  bg-bg px-3 py-1",
          !isValid && isTouched && " input-error ",
          !exists && " input-warning ",
          exists && isValid && !loading ? " input-success " : ""
        )}
        placeholder="Suggested By"
        name="suggestor"
        type="text"
        value={username}
        onChange={handleSetUsername}
      />

      <div className="mt-4 min-h-[2.2rem] w-full px-8">
        {loading ? (
          <div className="text-secondary">
            Checking if user @{username} exists
          </div>
        ) : exists ? (
          <div className="text-success">Valid username @{username} </div>
        ) : !isValid && isTouched ? (
          <div className="text-error text-sm">
            must be 3-16 characters long, alphanumeric only
          </div>
        ) : isValid && isTouched && exists ? (
          <div className=" text-success">Confirmed username @{username} </div>
        ) : (
          <div className="text-warning text-sm">@{username} doesn't exist</div>
        )}
      </div>
    </>
  );
}
export default SuggestedByUserSearch;
