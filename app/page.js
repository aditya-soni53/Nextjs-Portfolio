import HomeClient from "@/components/client-view/home";
import About from "@/components/client-view/about";
import ExperienceAndEducation from "@/components/client-view/experience";
import Project from "@/components/client-view/project";
import Contact from "@/components/client-view/contact";

async function extractData(currentSection) {
  const res = await fetch(`http://localhost:3000/api/${currentSection}/`, {
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
    <div>
      <HomeClient data={homeSectionData} />
      <About data={aboutSectionData} />
      <ExperienceAndEducation
        experiencedata={experienceSectionData}
        educationdata={educationSectionData}
      />
      <Project data={projectSectionData} />
      <Contact />
    </div>
  );
}
