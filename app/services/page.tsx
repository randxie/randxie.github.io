'use client' // Th'is marks the component for client-side rendering

import React, { useEffect } from 'react'

export default function Services() {
  useEffect(() => {
    // Function to dynamically load the script
    const loadScript = () => {
      const script = document.createElement('script')
      script.src = 'https://getlaunchlist.com/js/widget.js'
      script.defer = true
      document.body.appendChild(script)
    }

    // Check if the script is already loaded
    if (!document.querySelector('script[src="https://getlaunchlist.com/js/widget.js"]')) {
      loadScript()
    }
  }, [])

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Services
          </h1>
        </div>
        <div className="container py-12">
          <h2 className="text-2xl font-bold mb-4">GenAI Consulting Service</h2>
          <p className="text-lg text-gray-800 dark:text-gray-300">
            I offer consulting services to startups keen on incorporating Generative AI into their
            products. My services include product ideation, early-stage prototyping, and system
            design.<br></br>
            <br></br>
            Rates are project-based and vary according to the project's scope. <br></br>
            <br></br>
          </p>
          <h2 className="text-2xl font-bold mb-4">Career Coaching</h2>
          <p className="text-lg text-gray-800 dark:text-gray-300">
            I provide career coaching for individuals aiming to transition into Generative AI, ML
            Infrastructure, or Data Science. Originating from a mechanical engineering background, I
            cultivated my skills in ML independently. Notably, I advanced to lead ML infrastructure
            projects at both Robinhood and Google. <br></br>
            <br></br>
            My services encompass comprehensive resume reviews, thorough interview preparation, and
            strategic career guidance. <br></br>
            <br></br>
            The hourly rate is $300 (USD). Coaching sessions can be scheduled through{' '}
            <a href="mailto:randxiexyy29@gmail.com" className="text-blue-500 underline">
              my email
            </a>
            . <br></br>
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">LLM Serving System Course</h2>
          <p className="text-lg text-gray-800 dark:text-gray-300">
            Currently under development. This course will offer a comprehensive summary of the
            latest research progress in Large Language Model (LLM) serving systems, presented in an
            easily digestible format. Participants will benefit from step-by-step exercises and
            weekly QA sessions.
          </p>
          <ul className="list-disc list-inside text-lg text-gray-800 dark:text-gray-300 mt-4">
            <li>Transformer Architecture with deep dive into attention</li>
            <li>Techniques to speed up inference</li>
            <li>Sampling / Decoding Process</li>
            <li>Implement a single-machine Chat system</li>
            <li>Distributed LLM serving</li>
          </ul>
          <p className="text-lg text-gray-800 dark:text-gray-300 mt-4">
            Join the waitlist to receive notifications about the course's availability.
          </p>
        </div>
        <div className="launchlist-widget" data-key-id="Unwe21" data-height="180px"></div>
      </div>
    </>
  )
}
