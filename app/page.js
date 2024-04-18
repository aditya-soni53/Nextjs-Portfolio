import HomeClient from "@/components/client-view/home";
import About from "@/components/client-view/about";
import ExperienceAndEducation from "@/components/client-view/experience";
import Project from "@/components/client-view/project";
import Contact from "@/components/client-view/contact";

async function extractData(currentSection) {
  const res = await fetch(`/api/${currentSection}`, {
    method: "GET",
    cache: "no-store",
  });
  const data = await res.json();
  return data && data.data;
}

export default async function Home() {
  const homeSectionData = await extractData("home");
  const aboutSectionData = await extractData("about");
  const experienceSectionData = await extractData("experience");
  const educationSectionData = await extractData("education");
  const projectSectionData = await extractData("projects");

  return (
    <>
      <HomeClient data={homeSectionData} />
      <About
        data={
          aboutSectionData && aboutSectionData.length
            ? aboutSectionData[0]
            : null
        }
      />
      <ExperienceAndEducation
        experienceData={experienceSectionData}
        educationData={educationSectionData}
      />
      <Project data={projectSectionData} />
      <Contact />
    </>
  );
}
