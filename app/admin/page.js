"use client";

import AdminHomeView from "@/components/admin-view/home";
import AdminAboutView from "@/components/admin-view/about";
import AdminExperienceView from "@/components/admin-view/experience";
import AdminEducationView from "@/components/admin-view/education";
import AdminProjectView from "@/components/admin-view/projects";
import AdminContactView from "@/components/admin-view/contact";
import { useEffect, useState } from "react";
import { addData, getData, login, updateData } from "@/services";
import Login from "@/components/admin-view/Login";

const initialHomeFormData = {
  heading: "",
  summary: "",
};

const initialAboutFormData = {
  aboutme: "",
  noofprojects: "",
  yearofexperience: "",
  noofclients: "",
  skills: "",
};

const initialExperienceFormData = {
  position: "",
  company: "",
  duration: "",
  location: "",
  jobprofile: "",
};

const initialEducationFormData = {
  degree: "",
  year: "",
  college: "",
};

const initialProjectFormData = {
  name: "",
  website: "",
  technologies: "",
  github: "",
};

const initialLoginFormData = {
  username: "",
  password: "",
};

export default function AdminView() {
  const [currentSelectedTab, setCurrentSelectedTab] = useState("home");

  const [homeViewFormData, setHomeViewFormData] = useState(initialHomeFormData);

  const [aboutViewFormData, setAboutViewFormData] =
    useState(initialAboutFormData);
  const [educationViewFormData, setEducationViewFormData] = useState(
    initialEducationFormData
  );

  const [experienceViewFormData, setExperienceViewFormData] = useState(
    initialExperienceFormData
  );

  const [projectViewFormData, setProjectViewFormData] = useState(
    initialProjectFormData
  );

  const [allData, setAllData] = useState({});

  const [update, setUpdate] = useState(false);

  const [authUser, setAuthUser] = useState(false);

  const [loginFormData, setLoginFormData] = useState(initialLoginFormData);

  function resetFormData() {
    setHomeViewFormData(initialHomeFormData);
    setAboutViewFormData(initialAboutFormData);
    setEducationViewFormData(initialEducationFormData);
    setExperienceViewFormData(initialExperienceFormData);
    setProjectViewFormData(initialProjectFormData);
  }

  // console.log(allData, homeViewFormData, "homeViewdata");

  async function extractAllData() {
    const response = await getData(currentSelectedTab);

    if (currentSelectedTab === "home" && response && response.data.length) {
      setHomeViewFormData(response && response.data[0]);

      setUpdate(true);
    }

    if (currentSelectedTab === "about" && response && response.data.length) {
      setAboutViewFormData(response && response.data[0]);

      setUpdate(true);
    }

    if (response?.success) {
      setAllData({
        ...allData,
        [currentSelectedTab]: response && response.data,
      });
    }
  }

  async function handlesaveData() {
    const dataMap = {
      home: homeViewFormData,
      about: aboutViewFormData,
      education: educationViewFormData,
      experience: experienceViewFormData,
      projects: projectViewFormData,
    };

    const response = update
      ? await updateData(currentSelectedTab, dataMap[currentSelectedTab])
      : await addData(currentSelectedTab, dataMap[currentSelectedTab]);

    if (response.success) {
      resetFormData();
      extractAllData();
    }
  }
  useEffect(() => {
    extractAllData();
  }, [currentSelectedTab]);

  useEffect(() => {
    setAuthUser(JSON.parse(sessionStorage.getItem("authUser")));
  }, []);

  async function handleLogin() {
    const res = await login(loginFormData);
    console.log(res);
    setLoginFormData(initialLoginFormData);
    if (res?.success) {
      setAuthUser(true);
      sessionStorage.setItem("authUser", JSON.stringify(true));
    }
  }

  if (!authUser) {
    return (
      <Login
        formData={loginFormData}
        setFormData={setLoginFormData}
        handleLogin={handleLogin}
      />
    );
  }

  const menuList = [
    {
      id: "home",
      label: "Home",
      component: (
        <AdminHomeView
          formData={homeViewFormData}
          setFormData={setHomeViewFormData}
          handlesaveData={handlesaveData}
        />
      ),
    },
    {
      id: "about",
      label: "About",
      component: (
        <AdminAboutView
          formData={aboutViewFormData}
          setFormData={setAboutViewFormData}
          handlesaveData={handlesaveData}
        />
      ),
    },
    {
      id: "experience",
      label: "Experience",
      component: (
        <AdminExperienceView
          formData={experienceViewFormData}
          setFormData={setExperienceViewFormData}
          handlesaveData={handlesaveData}
          data={allData?.experience}
        />
      ),
    },
    {
      id: "education",
      label: "Education",
      component: (
        <AdminEducationView
          formData={educationViewFormData}
          setFormData={setEducationViewFormData}
          handlesaveData={handlesaveData}
          data={allData?.education}
        />
      ),
    },
    {
      id: "projects",
      label: "Projects",
      component: (
        <AdminProjectView
          formData={projectViewFormData}
          setFormData={setProjectViewFormData}
          handlesaveData={handlesaveData}
          data={allData?.projects}
        />
      ),
    },
    {
      id: "contact",
      label: "Contact",
      component: <AdminContactView />,
    },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-0.5 flex justify-center space-x-6" role="tablist">
        {menuList.map((item) => (
          <button
            key={item.id}
            type="button"
            className="p-4 font-bold text-xl text-black"
            onClick={() => {
              setCurrentSelectedTab(item.id);
              resetFormData();
              setUpdate(false);
            }}
          >
            {item.label}
          </button>
        ))}
        <button
          className="p-4 font-bold text-xl text-black"
          onClick={() => {
            setAuthUser(false);
            sessionStorage.removeItem("authUser");
          }}
        >
          Logout
        </button>
      </nav>
      <div className="mt-5 p-10">
        {menuList.map(
          (item) => item.id === currentSelectedTab && item.component
        )}
      </div>
    </div>
  );
}
