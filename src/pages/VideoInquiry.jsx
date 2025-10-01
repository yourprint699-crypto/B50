import PageWrapper from '../components/common/PageWrapper'
import VideoInquiryForm from '../components/forms/VideoInquiryForm'
import BackToHome from '../components/common/BackToHome'

const VideoInquiry = () => {
  return (
    <PageWrapper>
      <div className='overflow-x-hidden'>
        <BackToHome />

        <div className='min-h-screen section-dark text-white'>
          <div className='container mx-auto pb-16 sm:pb-24 lg:pb-32'>
            <div className='max-w-4xl mx-auto pt-24 sm:pt-32 lg:pt-40'>
              <div className='text-center mb-8 sm:mb-12 lg:mb-16'>
                <h1 className='font-[font2] heading-responsive-xl uppercase text-white mb-4 sm:mb-6 text-layer-3'>
                  Start Your Project
                </h1>
                <p className='font-[font1] text-responsive text-white/70 max-w-2xl mx-auto px-4'>
                  Ready to bring your vision to life? Share your project details and we'll provide a custom quote tailored to your needs.
                </p>
              </div>

              <VideoInquiryForm />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default VideoInquiry
