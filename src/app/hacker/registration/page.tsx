import React from "react";

import { getSession } from "../../lib/auth";
import RegistrationForm from "./RegistrationForm";

const HackerRegistration = async () => {
  const session = await getSession();

  let userId = "";
  if (session && session.user) {
    userId = session.user.image
      ? session.user.image.match(/\/u\/(\d+)\?/)![1]
      : "";
  }

  const response = await fetch(`https://api.github.com/user/${userId}`);
  const userData = await response.json();
  const username = userData.login;

  return (
    <div className="m-auto p-[20px] max-w-5xl bg-white">
      {/* <h1 className="text-3xl mb-10 font-bold">Hacker Registration</h1> */}
      <RegistrationForm username={username} />
    </div>
  );
};

export default HackerRegistration;
