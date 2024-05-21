"use client";

import { useEffect, useState } from "react";
import HomeClient from "@/components/client-view/home";
import About from "@/components/client-view/about";
import ExperienceAndEducation from "@/components/client-view/experience";
import Project from "@/components/client-view/project";
import Contact from "@/components/client-view/contact";

async function fetchData(section) {
  const res = await fetch(`/api/${section}`, {
    method: "GET",
    cache: "no-store",
  });
  const data = await res.json();

  console.log(data, `${section} data`);

  return data.data;
}

export default function Home() {
  const [homeData, setHomeData] = useState({});
  const [aboutData, setAboutData] = useState({});
  const [experienceData, setExperienceData] = useState({});
  const [educationData, setEducationData] = useState({});
  const [projectData, setProjectData] = useState({});

  useEffect(() => {
    const fetchDataForSection = async (section, setData) => {
      try {
        const data = await fetchData(section);
        setData(data);
      } catch (error) {
        // Handle the error, e.g., show a message to the user
        console.error(`Error fetching data for ${section}:`, error);
      }
    };

    const fetchDataForAllSections = async () => {
      try {
        const home = fetchDataForSection("home", setHomeData);
        const about = fetchDataForSection("about", setAboutData);
        const experience = fetchDataForSection("experience", setExperienceData);
        const education = fetchDataForSection("education", setEducationData);
        const projects = fetchDataForSection("projects", setProjectData);
        await Promise.all([home, about, experience, education, projects]);
      } catch (error) {
        // Handle the error, e.g., show a message to the user
        console.error("Error fetching data for all sections:", error);
      }
    };

    fetchDataForAllSections();
  }, []);

  console.log(homeData, "homeData");
  console.log(aboutData, "aboutData");
  console.log(experienceData, "experienceData");
  console.log(educationData, "educationData");
  console.log(projectData, "projectData");

  return (
    <>
      <HomeClient data={homeData} />
      <About data={aboutData[0]} />
      <ExperienceAndEducation
        experienceData={experienceData}
        educationData={educationData}
      />
      <Project data={projectData} />
      <Contact />
    </>
  );
}
