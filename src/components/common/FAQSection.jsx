import React, { useState } from 'react'

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is your typical turnaround time for video projects?",
      answer: "Most video projects are completed within 2-4 weeks, depending on complexity. Rush delivery options are available for urgent projects. We provide detailed timelines during our initial consultation."
    },
    {
      question: "Do you offer revisions on the final video?",
      answer: "Yes, we include up to 3 rounds of revisions in our standard packages. Additional revisions can be accommodated at a nominal fee. We work closely with you to ensure the final product meets your vision."
    },
    {
      question: "What types of videos do you specialize in?",
      answer: "We specialize in corporate videos, commercials, promotional content, event coverage, documentary-style films, and social media content. Our team has extensive experience across various industries and formats."
    },
    {
      question: "Can you work with clients remotely?",
      answer: "Absolutely! We work with clients worldwide. Our remote collaboration process includes virtual meetings, online file sharing, and seamless communication throughout the project lifecycle."
    },
    {
      question: "What equipment and software do you use?",
      answer: "We use professional-grade cinema cameras, lighting equipment, and sound recording tools. Our post-production suite includes industry-standard software like Adobe Premiere Pro, After Effects, and DaVinci Resolve for color grading."
    },
    {
      question: "How do you handle project pricing?",
      answer: "Each project is unique, so we provide custom quotes based on your specific needs, timeline, and deliverables. Contact us for a detailed consultation and transparent pricing breakdown."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className='contact-content'>
      <h3 className='font-[font2] heading-responsive-lg uppercase text-[#D3FD50] mb-6 sm:mb-8 lg:mb-10 text-center text-layer-2 text-glow'>
        Frequently Asked Questions
      </h3>
      <div className='space-y-4'>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className='floating-panel-dark cursor-pointer'
            onClick={() => toggleFAQ(index)}
          >
            <div className='flex justify-between items-start gap-4'>
              <h4 className='font-[font2] text-lg sm:text-xl text-layer-2 flex-1 whitespace-nowrap overflow-hidden text-ellipsis'>
                {faq.question}
              </h4>
              <div
                className={`text-[#D3FD50] text-2xl transition-transform duration-300 flex-shrink-0 ${
                  openIndex === index ? 'rotate-45' : ''
                }`}
              >
                +
              </div>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className='font-[font1] text-responsive text-layer-1 leading-relaxed'>
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQSection
