import heroIamge from "data-base64:~assets/revenue_removebg.png"

export const Home = () => {
  return (
    <div className="plasmo-flex plasmo-flex-col plasmo-items-center plasmo-justify-center plasmo-h-screen plasmo-w-screen plasmo-bg-gradient-to-b plasmo-from-white plasmo-to-gray-50 plasmo-text-black plasmo-p-6">
      <div className="plasmo-bg-white plasmo-rounded-full plasmo-p-4 plasmo-shadow-lg plasmo-mb-8">
        <img 
          className="plasmo-h-[80px] plasmo-w-[80px] plasmo-object-contain" 
          src={heroIamge} 
          alt="Revenuealot Logo" 
        />
      </div>
      
      <h1 className="plasmo-text-3xl plasmo-font-bold plasmo-text-center plasmo-bg-clip-text plasmo-text-transparent plasmo-bg-gradient-to-r plasmo-from-blue-600 plasmo-to-purple-600">
        Welcome to Revenuealot Extension
      </h1>
      
      <div className="plasmo-mt-6 plasmo-text-center plasmo-max-w-[320px]">
        <p className="plasmo-text-gray-600 plasmo-leading-relaxed">
          This extension helps you conduct comprehensive market research. To start, visit a product page on{" "}
          <a 
            href="https://www.takealot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="plasmo-text-blue-600 hover:plasmo-text-blue-700 plasmo-underline"
          >
            Takealot.com
          </a>
          .
        </p>
        
        <div className="plasmo-mt-8">
          <a 
            href={`${process.env.PLASMO_PUBLIC_CLERK_SYNC_HOST}/dashboard`}
            target="_blank"
            rel="noopener noreferrer"
            className="plasmo-bg-blue-600 plasmo-text-white plasmo-px-6 plasmo-py-3 plasmo-rounded-full plasmo-font-medium plasmo-transition-all hover:plasmo-bg-blue-700 hover:plasmo-shadow-lg"
          >
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};
