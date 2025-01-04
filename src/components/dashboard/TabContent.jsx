// TabContent.js
import React from "react";
import SettingForm from "./SettingForm";
import DeleteAccount from "./DeleteAccount";
import Security from "./Security";
import Sessions from "./Sessions";
import Profile from "./Profile";

export const TabContent = ({ activeTab, userProfile }) => {
  switch (activeTab) {
    case "profile":
      return <Profile userProfile={userProfile}/>;

    case "sessions":
      return <Sessions />;

    case "security":
      return <Security userProfile={userProfile}/>;

    case "delete":
      return<DeleteAccount/>;
    case "settings":
      return <SettingForm />;

    default:
      return null;
  }
};
