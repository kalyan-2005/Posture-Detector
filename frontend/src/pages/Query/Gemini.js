"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Link } from "react-router-dom";
import { FiActivity } from "react-icons/fi";

import {
  Dumbbell,
  Loader2,
  Send,
  Sparkles,
  SpaceIcon as Yoga,
} from "lucide-react";

export default function YogaFitnessGuide() {
  const { register, handleSubmit, reset } = useForm();
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateText(data) {
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = `Prompt is ${data.prompt}; explain about the provided prompt in detail in plain text paragraphs without any special characters, or formatting symbols, or stars.`;
      const result = await model.generateContent(prompt);
      setResponse(result.response.text());
    } catch (error) {
      console.error("Error generating content:", error);
      setResponse(
        "Sorry, there was an error generating content. Please try again."
      );
    } finally {
      setLoading(false);
      reset();
    }
  }

  return (
    <>
      <header className="shadow-sm sticky top-0 bg-white z-50">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link
            to={"/"}
            className="flex items-center gap-2 text-decoration-none text-black"
          >
            <FiActivity className="text-2xl font-bold" />
            <span className="text-xl font-bold">PoseRight</span>
          </Link>
          {/* <nav className="hidden md:flex gap-6">
            <Link
              to="#features"
              className="tracking-wide font-medium text-decoration-none text-sm hover:underline underline-offset-4 text-black hover:text-red-500"
            >
              Features
            </Link>
            <Link
              to="#how-it-works"
              className="tracking-wide font-medium text-decoration-none text-sm hover:underline underline-offset-4 text-black"
            >
              How It Works
            </Link>
            <Link
              to="#benefits"
              className="tracking-wide font-medium text-decoration-none text-sm hover:underline underline-offset-4 text-black"
            >
              Benefits
            </Link>
          </nav> */}
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
      <div className="min-h-screen bg-gradient-to-b py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Yoga className="h-10 w-10" />
              <h1 className="text-4xl font-bold">
                AI-Powered Yoga & Fitness Guide
              </h1>
              <Dumbbell className="h-10 w-10" />
            </div>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Welcome to your personal AI assistant for yoga and fitness. Ask
              about postures, benefits, flexibility, strength, or injury
              prevention, and get expert insights for a healthier, balanced
              lifestyle!
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative h-64 mb-8 rounded-xl overflow-hidden">
            <img
              src="/bot-page.avif"
              alt="Yoga and fitness"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <p className="text-white text-4xl font-black tracking-wide">
                Discover your path to wellness
              </p>
            </div>
          </div>

          {/* input Card */}
          <div className="mb-8 shadow-xl border-2 border-gray-100 rounded-xl p-4 flex flex-col gap-4">
            <divHeader>
              <divTitle className="flex items-center gap-2 text-xl font-bold">
                <Sparkles className="h-5 w-5" />
                Ask Your Fitness Question
              </divTitle>
              <divDescription className="text-sm text-gray-500">
                Type your yoga or fitness question below and our AI will provide
                detailed guidance
              </divDescription>
            </divHeader>
            <divContent>
              <form onSubmit={handleSubmit(generateText)} className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    {...register("prompt", { required: true })}
                    placeholder="E.g., 'How do I improve my downward dog pose?' or 'What exercises help with lower back pain?'"
                    className="flex-1 border rounded-md p-2 px-4 outline-gray-400"
                  />
                  <button
                    type="submit"
                    className="flex items-center bg-black text-white p-1 px-3 rounded"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Generate
                      </>
                    )}
                  </button>
                </div>
              </form>
            </divContent>
          </div>

          {/* Response div */}
          <div className="border-2 border-gray-100 rounded-xl p-4 shadow-xl">
            <divHeader>
              <h4 className="font-medium">AI Response</h4>
              <p className="text-sm text-gray-500">
                Your personalized yoga and fitness guidance
              </p>
            </divHeader>
            <divContent>
              <div className="h-96 overflow-y-auto rounded-md p-4">
                {response.length > 0 ? (
                  <p className="whitespace-pre-line">{response}</p>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <h3>
                      Please enter a prompt and click on the generate button
                    </h3>
                    <p className="text-sm mt-2">
                      Try asking about yoga poses, workout routines, or fitness
                      tips
                    </p>
                  </div>
                )}
              </div>
            </divContent>
            <divFooter className="text-xs text-gray-500">
              Powered by Google Gemini AI
            </divFooter>
          </div>
        </div>
      </div>
    </>
  );
}
