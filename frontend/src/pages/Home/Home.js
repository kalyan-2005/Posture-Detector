import { Link } from "react-router-dom";
import { FiActivity } from "react-icons/fi";
import { FaAngleDoubleRight } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { FaClipboardCheck } from "react-icons/fa";

export default function Home() {
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="shadow-sm sticky top-0 bg-white z-50">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link
            to={"/"}
            className="flex items-center gap-2 text-decoration-none text-black"
          >
            <FiActivity className="text-2xl font-bold" />
            <span className="text-xl font-bold">PoseRight</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <button
              onClick={()=>scrollToSection("features")}
              className="tracking-wide font-medium text-decoration-none text-sm hover:underline underline-offset-4 text-black hover:text-red-500"
            >
              Features
            </button>
            <button
              onClick={()=>scrollToSection("how-it-works")}
              className="tracking-wide font-medium text-decoration-none text-sm hover:underline underline-offset-4 text-black"
            >
              How It Works
            </button>
            <button
              onClick={()=>scrollToSection("benefits")}
              className="tracking-wide font-medium text-decoration-none text-sm hover:underline underline-offset-4 text-black"
            >
              Benefits
            </button>
          </nav>
          <div className="flex items-center gap-4">
            <button asChild variant="outline" className="hidden md:flex">
              <Link
                to="/bot"
                className="text-decoration-none text-black p-2 rounded-md border hover:bg-gray-100 text-sm font-medium"
              >
                Ask Query
              </Link>
            </button>
            <button asChild>
              <Link
                to="/start"
                className="text-decoration-none text-white p-2 rounded-md bg-black text-sm font-medium"
              >
                Get Started
              </Link>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-black">
                    Perfect Your Exercise <br /> Posture with AI
                  </h1>
                  <p className="max-w-[600px] text-lg text-gray-500 md:text-xl">
                    PoseRight uses advanced AI to detect and correct your yoga
                    postures in real-time, helping you achieve better form and
                    maximize your workout benefits.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <button asChild size="lg">
                    <Link
                      to="/start"
                      className="text-decoration-none text-white p-2 px-4 rounded-md bg-black font-medium flex items-center gap-2"
                    >
                      Start Your Journey <FaAngleDoubleRight />
                    </Link>
                  </button>
                  <button asChild variant="outline" size="lg">
                    <button
                      className="text-decoration-none text-black p-2 bg-white rounded-md border hover:bg-gray-100 font-medium"
                      onClick={() => scrollToSection("how-it-works")}
                    >
                      Learn More
                    </button>
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                  <img
                    src="/hero-section.webp"
                    alt="Person doing yoga with posture detection overlay"
                    width={800}
                    height={500}
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-black tracking-tighter sm:text-4xl md:text-5xl">
                  Platform Features
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover how PoseRight can transform your yoga practice with
                  these powerful features
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                  <IoCameraOutline className="text-4xl font-semibold" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs">Posture Detection</h4>
                  <p className="text-muted-foreground">
                    Real-time analysis of your yoga poses with the instant
                    feedback on alignment and form.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                  <FaRegClock className="text-3xl font-semibold" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold">Countdown Tracking</h4>
                  <p className="text-muted-foreground">
                    Built-in timers to help you hold poses for the optimal
                    duration and track your progress.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                  <FaRegMessage className="text-3xl font-semibold" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold">Fitness Query System</h4>
                  <p className="text-muted-foreground">
                    Ask questions about fitness, yoga, and wellness to get
                    expert answers and guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get started with PoseRight in just a few simple steps
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                  <span className="text-xl font-bold">1</span>
                </div>
                <div className="space-y-2">
                  <h5 className="text-xl font-bold">Select Your Pose</h5>
                  <p className="text-muted-foreground">
                    Choose from our library of yoga poses or follow a guided
                    sequence.
                  </p>
                </div>
                <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                  <img
                    src="/select-posture.jpeg"
                    alt="Selecting yoga pose from library"
                    width={300}
                    height={200}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                  <span className="text-xl font-bold">2</span>
                </div>
                <div className="space-y-2">
                  <h5 className="text-xl font-bold">Set Up Your Camera</h5>
                  <p className="text-muted-foreground">
                    Position your device so the camera can see your full body
                    during practice.
                  </p>
                </div>
                <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                  <img
                    src="/camera.png"
                    alt="Setting up camera for yoga"
                    width={300}
                    height={400}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                  <span className="text-xl font-bold">3</span>
                </div>
                <div className="space-y-2">
                  <h5 className="text-xl font-bold">Get Real-time Feedback</h5>
                  <p className="text-muted-foreground">
                    Receive instant corrections and guidance to perfect your
                    form.
                  </p>
                </div>
                <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                  <img
                    src="/feedback.png"
                    alt="Real-time feedback on yoga pose"
                    width={300}
                    height={400}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px] aspect-square rounded-xl overflow-hidden">
                  <img
                    src="/benifits.jpeg"
                    alt="Person doing yoga with improved posture"
                    width={500}
                    height={500}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Benefits of Using PoseRight
                  </h2>
                  <p className="text-muted-foreground md:text-xl">
                    Transform your yoga practice with these powerful advantages
                  </p>
                </div>
                <ul className="grid gap-4">
                  <li className="flex items-start gap-4">
                    <FaClipboardCheck className="text-xl mt-1" />
                    <div>
                      <h5 className="font-bold">Improved Form and Alignment</h5>
                      <p className="text-muted-foreground">
                        Perfect your poses with real-time feedback, reducing the
                        risk of injury and maximizing benefits.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <FaClipboardCheck className="text-xl mt-1" />
                    <div>
                      <h5 className="font-bold">Track Your Progress</h5>
                      <p className="text-muted-foreground">
                        Monitor your improvement over time with detailed
                        analytics and performance metrics.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <FaClipboardCheck className="text-xl mt-1" />
                    <div>
                      <h5 className="font-bold">Personalized Guidance</h5>
                      <p className="text-muted-foreground">
                        Receive customized recommendations based on your
                        specific needs and goals.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <FaClipboardCheck className="text-xl mt-1" />
                    <div>
                      <h5 className="font-bold">Learn at Your Own Pace</h5>
                      <p className="text-muted-foreground">
                        Practice anytime, anywhere with guidance that adapts to
                        your skill level.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Yoga Practice?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who have improved their form and
                  achieved better results with PoseRight.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <button asChild size="lg">
                  <Link
                    to="/start"
                    className="text-decoration-none text-white p-2 px-4 rounded-md bg-black font-medium flex items-center gap-2"
                  >
                    Get Started for Free <FaAngleDoubleRight />
                  </Link>
                </button>
                <button asChild variant="outline" size="lg">
                  <Link
                    to="/demo"
                    className="text-decoration-none text-black p-2 px-3 bg-white rounded-md border hover:bg-gray-100 font-medium"
                  >
                    Watch Demo
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100">
        <div className="container flex flex-col gap-6 py-4 md:py-12 px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FiActivity className="text-2xl font-bold" />
              <span className="text-xl font-bold">PoseRight</span>
            </div>
            <nav className="flex gap-4 md:gap-6">
              <Link
                to="#"
                className="text-sm font-medium text-decoration-none text-black"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-sm font-medium text-decoration-none text-black"
              >
                Terms of Service
              </Link>
              <a
                href="mailto:kalyantingani@gmail.com"
                className="text-sm font-medium text-decoration-none text-black"
              >
                Contact Us
              </a>
            </nav>
            <div className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} PoseRight. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
