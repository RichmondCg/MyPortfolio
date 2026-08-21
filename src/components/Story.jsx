import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import Navigation from "./Navigation.jsx";

const CHAPTERS = [
  {
    year: "2013",
    title: "Where It All Started",
    body: "My first line of code was HTML and CSS because we had a computer subject way back when I was in Grade 7. That was the time I got the idea of how a website was built, and I became interested in programming. I still remember being the first one to finish a practical test and thinking I could be a hacker just because I knew programming now haha.",
  },
  {
    year: "2016",
    title: "My First Real Build",
    body: `We had a research subject when I was in Grade 10. Since I already knew some simple robotics and electronics, this was the time I took the risk to prove and improve my skills. With my first Arduino, I proposed a title: "Solar Powered Arduino Based Auto-Monitoring Irrigation System for Garden Use." The study was approved and then chosen to compete in a Science Fair. No place, to be honest haha, but it was still a great experience because my teammates and I built a functioning system on our own.`,
  },
  {
    year: "2022",
    title: "The Real Start",
    body: "I was now a first-year college student, and I took IT by accident haha. It was supposed to be Electrical Engineering. When applying to the school, I put IT as my first choice and EE as my second choice. I thought I could still decide once I passed the entrance exam. But yeah, somehow IT lit a spark in me because it felt similar to engineering. The first programming language I learned was C++. I had already learned the basics of it when we were building our Arduino project, but only as an introduction. Still, I was thinking again that I was awesome and could work at NASA or the Pentagon someday haha. But this was also where I met HTML and CSS again after 9 years.",
  },
  {
    year: "2023",
    title: "The Turning Point",
    body: "Just like the title says, this is the part where a strong twist occurred: Data Structures and Algorithms. Learning linked lists, stacks, queues, sorting, etc. I knew what those things were, but executing and combining them hurt my brain. At some point, I wished I had just pursued Electrical Engineering or Electronics Engineering at another school. And I realized I couldn't be a hacker haha, at least not like the ones in the movies, or someone working at the Pentagon.",
  },
  {
    year: "2023",
    title: "The Vacation That Changed Things",
    body: "The vacation before my 3rd year was the time when I decided to pursue something and really focus on it. I chose web development, and that started my journey of self-studying. After HTML and CSS, I learned JavaScript and then Git. By God's blessing, I got a message from a student who wanted me to be their consultant and builder for their study because it involved Arduino. So I grabbed that opportunity and made money from it. I was so happy because that project got 1st place in the division and 2nd place in the regional competition. I was multitasking at that time, self-studying while also building an Arduino project for a client.",
  },
  {
    year: "2024",
    title: "Going Full-Stack",
    body: "After HTML, CSS, JavaScript, and Git, I built personal basic frontend website projects without a backend, connecting the frontend to third-party APIs like PokeAPI and JokesAPI. This was also where I learned a styling framework, Bootstrap. Then I was introduced to databases and SQL. I learned basic queries, building databases, and joining tables. In the 2nd semester, I decided to make this my specialization: Database Systems Technology. I learned a lot about databases, like relational, non-relational, and even hybrid databases, normalization, and many more. Somehow, it also helped me start learning backend development.",
  },
  {
    year: "2024",
    title: "Into the Backend",
    body: "During vacation, which for me is basically the time to upskill, learn for myself, and do freelancing again for IoT projects, I decided to focus on backend development. Because I had already learned JavaScript, my brain couldn't handle learning a completely different language at that time haha. PHP had already been introduced back in 2nd year, but I wasn't interested enough to push myself hard to learn it. So I chose Node.js and Express.js because they were easier for me to grasp since they use JavaScript. I didn't have to deal with a very steep learning curve. That was the time I learned how to make simple RESTful APIs, understand HTTP methods, and connect applications to databases.",
  },
  {
    year: "2025",
    title: "The Full-Stack Mindset",
    body: "This was the time I stopped freelancing because I got a part-time job as a Data Entry Associate, and I also had our capstone project, which was very important for me to graduate. Our capstone project was a job-finding platform for blue-collar workers, and in this project, I was the full backend developer of our team. I was responsible for the whole architecture of the backend and also supported the frontend development. To be honest, I'm grateful for this experience because this was the time when I gained very useful knowledge as someone building an actual system. I learned web security, authentication, authorization, hashing, encryption, RBAC, 2FA, MongoDB, handling CORS issues, rate limiting, caching, logging, and many more. This was also the time I started using Tailwind CSS and React JS as my frontend framework, even though React is technically a library.",
  },
  {
    year: "2026",
    title: "From Development to Design",
    body: "Because I already knew how to develop a full-stack project, it was time to upskill again and render my 500 hours of OJT. I worked in a company as a software developer and was assigned as a frontend developer. This was where I learned how people move and work inside an office, how they handle projects with proper structure, the right practices and attitude, and how collaboration actually works. I also met awesome people who helped me and made me more motivated to continue. I collaborated with my fellow interns. I met a good designer, an intern who already had 6 years of experience in the industry, and a teammate who knew how to balance the tech and business sides. I learned a lot. I gained the ability to collaborate properly, listen actively, be open to feedback, communicate with clients, develop my UI/UX design skills, and understand what makes a design good or bad haha. Lastly, I learned how to test a system we built together in a systematic way. This was also the time when I started improving my UI/UX skills and began learning basic motion design, 3D, and WebGL.",
  },
  {
    year: "2026",
    title: "Beyond Development: WordPress, SEO, and Optimization",
    body: 'In the same year, this was also my first time teaming up with my freelance SEO Specialist friend. He called me and gave me a freelance project, which was the Nueva Insights website. I used WordPress, and that was the first time I had built a website using it. I used Tailwind for styling, and yes, my friend liked it, but of course, it can still be improved someday because it was a rushed project. Then the same friend gave me another opportunity with a new client, where I became an SEO Specialist Assistant, combining my technical knowledge of the web with his ability in SEO. It was like a fusion haha. The goal was to make the site index properly, so I updated the content and structure of 270+ pages together with my fellow teammates. As a result, you can now see that site appear in AI summaries and Google when you search "Top Gaming Top-up Platform in the Philippines." Lastly, another gig opened for me where I had to optimize the performance of a website for a digital marketing startup. As a result, I was able to improve its performance score from 48 to 80.',
  },
  {
    year: "Ready for What's Next",
    title: "Job Hunting and Ready to Contribute",
    body: "I am currently looking for a full-time job and ready to contribute and collaborate with a team or business that needs solutions to their problems. I will be happy to serve, take on any challenges that come my way, continue learning, and become the best IT professional I can be.",
  },
];

function Story() {
  const curtainRef = useRef(null);
  const headRef = useRef(null);
  const introRef = useRef(null);
  const listRef = useRef(null);
  const footRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.set([headRef.current, introRef.current, ".story-fade"], {
        autoAlpha: 0,
        y: 30,
      })
        .set([listRef.current, footRef.current], { autoAlpha: 0, y: 40 })
        .to(
          curtainRef.current,
          { yPercent: -100, duration: 0.7, ease: "power4.inOut" },
          0,
        )
        .to(
          [headRef.current, introRef.current, ".story-fade"],
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 },
          "-=0.25",
        )
        .to(
          listRef.current,
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        )
        .to(footRef.current, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.3");
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white font-mono text-black select-none">
      {/* Loading curtain */}
      <div
        ref={curtainRef}
        className="absolute inset-0 z-50 bg-white will-change-transform"
      />

      {/* Top bar + Menu */}
      <Navigation />

      {/* Content */}
      <main className="mx-auto max-w-5xl px-6 pt-32 md:px-12 md:pt-44">
        <p className="story-fade mb-4 text-[11px] tracking-[0.32em] uppercase">
          My story
        </p>
        <h1
          ref={headRef}
          className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-none tracking-tight"
        >
          The Journey
        </h1>

        <div ref={introRef} className="mt-8 max-w-2xl">
          <p className="text-sm leading-relaxed md:text-base">
            Every builder has a starting point. Mine began with curiosity when I
            was 12 years old. I am curious about robotics, electronics, and
            engineering. I grew into a love for building or crafting something.
            I am someone who likes to tinker gadgets, electronics, or toys with
            dynamo. I used to fix things in our house like radio, fan, printer,
            and even family computer. but to be honest than fixing it some ended
            up broken and mainly because of my curiosity what are the components
            inside, how things works, and what are those components are for. I
            survived on failure and from a "siraniko" i became someone who
            really fix things in our house and actually building something. But
            let's skip for now and focus on where software engineering started.
          </p>
        </div>

        {/* Timeline */}
        <div ref={listRef} className="mt-16">
          <div className="relative space-y-14 md:space-y-20">
            {CHAPTERS.map((chapter) => (
              <div
                key={chapter.year}
                className="story-fade relative grid gap-3 md:grid-cols-[180px_1fr] md:gap-10"
              >
                <p className="font-display text-xl text-black/60 md:text-2xl">
                  {chapter.year}
                </p>
                <div>
                  <h2 className="font-display text-lg md:text-2xl">
                    {chapter.title}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed md:text-base">
                    {chapter.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={footRef} className="my-10 border-t border-black/10 py-10">
          <Link
            to="/me"
            className="group inline-flex items-center gap-4 rounded-full border border-black px-8 py-4 text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 hover:bg-black hover:text-white"
          >
            Back to about
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-y-1"
            >
              <path
                d="M11 1L1 11M1 11H9M1 11V3"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Story;
